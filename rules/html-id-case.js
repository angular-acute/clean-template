const caseToKebab = (input) =>
  (input ?? "")
    .trim()
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace(/[\W_]/g, "-");

const caseToSnake = (input) => caseToKebab(input).replace(/-/, "_");

const caseToCamel = (input) =>
  (input ?? "").trim().replace(/[-_.]([a-z])/g, (c) => c[1].toUpperCase());

const caseToPascal = (input) =>
  caseToCamel(input).replace(/^[a-z]/, (c) => c[0].toUpperCase());

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

const range = (span) => [
  span.fullStart?.offset ?? span.start?.offset,
  span.end?.offset,
];

const getSource = (obj) => obj.source ?? getSource(obj.parent);

function buildExpression(exp) {
  return getSource(exp)?.substring(exp.span.start, exp.span.end);
}

function stringMerge(useCase, stringArray, varArray, pre) {
  return stringArray
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
}

function processTextAttribute(node, context, useCase) {
  if (node.name !== "id") return;
  const idValue = node.value;

  if (!idValue.trim()) {
    context.report({
      node,
      messageId: "missingId",
    });
  } else if (!formatCase[useCase].test(idValue)) {
    context.report({
      node,
      messageId: "incorrectCase",
      data: { case: nameCase[useCase] },
      fix(fixer) {
        return fixer.replaceTextRange(
          range(node.valueSpan),
          fixCase[useCase](idValue)
        );
      },
    });
  }
}

function processInterpolation$1(node, context, useCase, ignoreNg) {
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
    messageId: "incorrectCase",
    data: { case: nameCase[useCase] },
    fix(fixer) {
      return fixer.replaceTextRange(
        [node.sourceSpan.start, node.sourceSpan.end],
        stringMerge(useCase, fixedStrings, idVars)
      );
    },
  });
}

module.exports = {
  meta: {
    fixable: "code",
    type: "problem",
    schema: [
      {
        type: "object",
        properties: {
          case: {
            type: "string",
            enum: ["kebab", "snake", "camel", "pascal"],
            description:
              "The case style to enforce for template id attributes.",
          },
          ignoreInterpolated: {
            type: "boolean",
            description:
              'Whether to ignore id\'s with Angular interpolation (e.g. id="my-id-{{ value }}").',
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      incorrectCase: "Template id attributes should be in {{ case }}.",
      missingId: "Template id attributes should not be empty.",
    },
    docs: {
      description: "Enforces consistent case styling of the HTML id attribute.",
      url: "",
    },
  },
  create: (context) => {
    const useCase = context.options?.at(0)?.case ?? "kebab";
    const ignoreNg = context.options?.at(0)?.ignoreInterpolated;

    return {
      TextAttribute(node) {
        processTextAttribute(node, context, useCase);
      },

      Interpolation$1(node) {
        processInterpolation$1(node, context, useCase, ignoreNg);
      },
    };
  },
  defaultOptions: [{ case: "kebab", ignoreInterpolated: false }],
};
