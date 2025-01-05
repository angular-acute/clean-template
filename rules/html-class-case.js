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

 

function processTextAttribute(node, context, useCase) {
  if (node.name !== "class") return;

  if (!node.value.trim()) {
    context.report({
      node,
      messageId: "missingClass",
    });
    return;
  }

  const classValues = node.value.split(/(?<!\{\{[^}]*) (?!\}\})/);
  const nodeSpan=range(node.valueSpan)

  classValues.forEach((classValue) => {
    const classOffset=Math.max(node.value.indexOf(classValue),0)
    const classSpan = [nodeSpan[0]+classOffset,Math.min(nodeSpan[1],nodeSpan[0]+classOffset+classValue.length)]
  
    if (!formatCase[useCase].test(classValue)) {
      context.report({
        node,
        messageId: "incorrectCase",
        data: { case: nameCase[useCase] },
        fix(fixer) {
          return fixer.replaceTextRange(
            classSpan,
            fixCase[useCase](classValue)
          );
        },
      });
    }
  });
}

function processInterpolation$1(node, context, useCase, ignoreNg) {
  if (ignoreNg || node.parent?.parent?.name !== "class") return;
const reg = /\{\{(?:[^{}]|\{[^{}]*\})*\}\}/g

  const allClassVars = node.expressions.map(buildExpression);
  const source = getSource(node);

  



  const modSource = source.replace(/\{\{/g, "##OPEN##").replace(/\}\}/g, "##CLOSE##")

const classValues = source.split(/(?<!\{\{[^}]*) (?!\}\})/);
const classVales = modSource.split(/(?<!##OPEN##) (?!##CLOSE##)/);
const nodeSpan = [node.sourceSpan.start, node.sourceSpan.end];

classValues.forEach((classValue )=>{


  const unterpolated = classValue.replace(reg, nameCase[useCase] )
  const classOffset=Math.max(source.indexOf(classValue),0)
  const classSpan = [nodeSpan[0]+classOffset,Math.min(nodeSpan[1],nodeSpan[0]+classOffset+classValue.length)]

  if (!unterpolated || formatCase[useCase].test(unterpolated)) return;

const classSegments =  classValue.split( reg )
  const classVars=(allClassVars.length>1?allClassVars.splice(0,classSegments.length-1):allClassVars).map((classVar)=>`{{ ${classVar} }}`)



const fixedClass=classSegments.reduce(( fixed,segment,index)=>{
  const fixedSegment=fixCase[useCase](segment)
  const joiner = (index<(classSegments.length-1)&&!fixedSegment.endsWith(joinCase[useCase]))?joinCase[useCase]:""
return `${fixed}${fixedSegment}${joiner}${classVars[index]??""}`
},"")

context.report({
      node: node.parent.parent,
      messageId: "incorrectCase",
      data: { case: nameCase[useCase] },
      fix(fixer) {
        return fixer.replaceTextRange(classSpan, fixedClass);
      },
    });


})


 
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
              "The case style to enforce for template class attributes.",
          },
          ignoreInterpolated: {
            type: "boolean",
            description:
              'Whether to ignore class\'s with Angular interpolation (e.g. class="my-class-{{ value }}").',
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      incorrectCase: "Template class attributes should be in {{ case }}.",
      missingClass: "Template class attributes should not be empty.",
    },
    docs: {
      description:
        "Enforces consistent case styling of the HTML class attribute.",
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
