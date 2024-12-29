caseToKebab = (input) =>
  (input ?? "")
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace(/[\W_]/g, "-");

caseToSnake = (input) => caseToKebab(input).replace(/-/, "_");

caseToCamel = (input) =>
  (input ?? "").replace(/[-_.]([a-z])/g, (c) => c[1].toUpperCase());

caseToPascal = (input) =>
  caseToCamel(input).replace(/^[a-z]/, (c) => c[0].toUpperCase());

module.exports = {
  meta: {
    fixable: "code",
    type: "layout",
    schema: [
      {
        type: "object",
        properties: {
          case: {
            type: "string",
            enum: ["kebab" , "snake" , "camel" , "pascal"],
          },
          ignoreNgInterpolation: { type: "boolean" },
        },
      },
    ],
  },
  create: (context) => {
    const formatCase = {
      kebab: /^[a-z][a-z0-9-]*$/,
      snake: /^[a-z][a-z0-9_]*$/,
      camel: /^[a-z]+([A-Z0-9][a-z0-9]*)*$/,
      pascal: /^[A-Z][a-z0-9]+([A-Z][a-z0-9]*)*$/,
    };
    const nameCase = {
      kebab: "kebab-case",
      snake: "snake_case",
      camel: "camelCase",
      pascal: "PascalCase",
    };
    const fixCase = {
      kebab: caseToKebab,
      snake: caseToSnake,
      camel: caseToCamel,
      pascal: caseToPascal,
    };
    const joinCase = {
      kebab: "-",
      snake: "_",
      camel: "",
      pascal: "",
    };

    const range = (span) => [span.start?.offset, span.end?.offset];

    const useCase = context.options?.at(0)?.case ?? "kebab";
    const ignoreNg = context.options?.at(0)?.ignoreNgInterpolation;

    return {
      TextAttribute(node) {
        if (node.name !== "id") return;
        const idValue = node.value;

        if (!formatCase[useCase].test(idValue)) {
          context.report({
            node,
            message: `Template id attributes should be in ${nameCase[useCase]}.`,
            fix(fixer) {
              return fixer.replaceTextRange(
                range(node.valueSpan),
                fixCase[useCase](idValue)
              );
            },
          });
        }
      },
      Interpolation$1(node) {
        if (ignoreNg || node.parent?.parent?.name !== "id") return;

        buildName = (exp) => {
          if (exp.type === "BindingPipe") {
            return buildName(exp.exp);
          }
          if (exp.receiver?.name) {
            if (!exp.name && exp.type === "Call") {
              return `${buildName(exp.receiver)}()`;
            }

            return `${buildName(exp.receiver)}.${exp.name}`;
          }

          return exp.name;
        };

        buildPipe = (exp) => {
          if (exp.exp.type === "BindingPipe") {
            return `${buildPipe(exp.exp)} | ${exp.name}`;
          }

          return exp.name;
        };

        const stringMerge = (stringArray, varArray, pre) =>
          stringArray
            .reduce((newArray, strng, i) => {
              const trimmed = /^[-_]*([\w-]*[a-zA-Z0-9])[_-]*$/
                .exec(strng)
                ?.at(1);
              const sendArray = newArray;
              if (trimmed) sendArray.push(trimmed);
              if (!!varArray.at(i) || varArray.at(i) === 0)
                sendArray.push(
                  pre ? `${varArray.at(i)}` : `{{ ${varArray.at(i)} }}`
                );
              return sendArray;
            }, [])
            .join(joinCase[useCase]);

        const idVars = node.expressions.map((exp) => {
          if (exp.type === "BindingPipe") {
            return `${buildName(exp.exp)} | ${buildPipe(exp)}`;
          }

          return buildName(exp);
        });
        const idStrings = node.strings;

        if (
          !stringMerge(idStrings, Array(idStrings.length - 1).fill(""), true) ||
          formatCase[useCase].test(
            stringMerge(idStrings, Array(idStrings.length - 1).fill(""), true)
          )
        )
          return;

        const fixedStrings = idStrings.map((strng) => fixCase[useCase](strng));

        context.report({
          node: node.parent.parent,
          message: `Template id attributes should be in ${nameCase[useCase]}.`,
          fix(fixer) {
            return fixer.replaceTextRange(
              [node.sourceSpan.start, node.sourceSpan.end],
              stringMerge(fixedStrings, idVars)
            );
          },
        });
      },
    };
  },
  defaultOptions: [{ case: "kebab", ignoreNgInterpolation: false }],
};
