caseToKebab = (input) =>
  (input ?? "")
    .trim()
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace(/[\W_]/g, "-");

caseToSnake = (input) => caseToKebab(input).replace(/-/, "_");

caseToCamel = (input) =>
  (input ?? "").trim().replace(/[-_.]([a-z])/g, (c) => c[1].toUpperCase());

caseToPascal = (input) =>
  caseToCamel(input).replace(/^[a-z]/, (c) => c[0].toUpperCase());

formatCase = {
  kebab: /^[a-z][a-z0-9-]*$/,
  snake: /^[a-z][a-z0-9_]*$/,
  camel: /^[a-z]+([A-Z0-9][a-z0-9]*)*$/,
  pascal: /^[A-Z][a-z0-9]+([A-Z][a-z0-9]*)*$/,
};
nameCase = {
  kebab: "kebab-case",
  snake: "snake_case",
  camel: "camelCase",
  pascal: "PascalCase",
};
fixCase = {
  kebab: caseToKebab,
  snake: caseToSnake,
  camel: caseToCamel,
  pascal: caseToPascal,
};
joinCase = {
  kebab: "-",
  snake: "_",
  camel: "",
  pascal: "",
};

range = (span) => [
  span.fullStart?.offset ?? span.start?.offset,
  span.end?.offset,
];

getSource = (obj) => obj.source ?? getSource(obj.parent);

buildExpression = (exp) => {
  return getSource(exp)?.substring(exp.span.start, exp.span.end);
};

stringMerge = (useCase, stringArray, varArray, pre) =>
  stringArray
    .reduce((newArray, strng, i) => {
      const trimmed = pre
        ? strng
        : /^[-_]*([\w-]*[a-zA-Z0-9])[_-]*$/.exec(strng)?.at(1);
      const sendArray = newArray;
      if (trimmed) sendArray.push(trimmed);
      if (!!varArray.at(i) || varArray.at(i) === 0)
        sendArray.push(pre ? `${varArray.at(i)}` : `{{ ${varArray.at(i)} }}`);
      return sendArray;
    }, [])
    .join(pre ? "" : joinCase[useCase]);

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
            enum: ["kebab", "snake", "camel", "pascal"],
          },
          ignoreNgInterpolation: { type: "boolean" },
        },
      },
    ],
  },
  create: (context) => {
    const useCase = context.options?.at(0)?.case ?? "kebab";
    const ignoreNg = context.options?.at(0)?.ignoreNgInterpolation;

    return {
      TextAttribute(node) {
        if (node.name !== "id") return;
        const idValue = node.value;

        const format = formatCase[useCase].test(idValue);
        const fixum = fixCase[useCase](idValue);

        if (!idValue.trim()) {
          context.report({
            node,
            message: `Template id attributes should not be empty.`,
          });
        } else if (!formatCase[useCase].test(idValue)) {
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

        const idVars = node.expressions.map(buildExpression);

        const idStrings = node.strings;

        const mergedString = stringMerge(
          useCase,
          idStrings,
          Array(idStrings.length - 1).fill(nameCase[useCase]),
          true
        );

        if (!mergedString || formatCase[useCase].test(mergedString)) return;

        const fixedStrings = idStrings.map((strng) => fixCase[useCase](strng));

        context.report({
          node: node.parent.parent,
          message: `Template id attributes should be in ${nameCase[useCase]}.`,
          fix(fixer) {
            return fixer.replaceTextRange(
              [node.sourceSpan.start, node.sourceSpan.end],
              stringMerge(useCase, fixedStrings, idVars)
            );
          },
        });
      },
    };
  },
  defaultOptions: [{ case: "kebab", ignoreNgInterpolation: false }],
};
