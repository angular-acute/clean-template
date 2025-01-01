const getSource = (obj) => obj.source ?? getSource(obj.parent);

module.exports = {
  meta: {
    fixable: "code",
    type: "problem",
    messages: {
      binding: "Prefer binding '{{ theVariable }}', rather than interpolating.",
      interpolation: "Unnecessary interpolation of '{{ theValue }}'.",
    },
    docs: {
      description:
        "Enforces property binding over simple variable interpolation.",
      url: "",
    },
  },
  create: (context) => {
    const range = (node) => [
      node.sourceSpan.start.offset,
      node.sourceSpan.end.offset,
    ];

    return {
      Interpolation$1(node) {
        if (node.parent?.parent?.type !== "BoundAttribute") return;

        const expr = node.expressions
          .map(getSource)
          .join("")
          .replace(/^\{\{|\}\}$/g, "");
        const expression = expr.includes(`\n`) ? expr : expr.trim();
        const replaceMessage = expression
          .split(/\n/)
          .map((exp) => exp.trim())
          .join(" ")
          .trim()
          .replace(/^[\'\`\"]|[\'\`\"]$/g, "");

        if (
          ["Call", "PropertyRead", "Binary"].includes(
            node.expressions.at(0).type
          ) &&
          !node.strings.filter((str) => str).length
        ) {
          context.report({
            node: node.parent.parent,
            messageId: "binding",
            data: {
              theVariable: replaceMessage,
            },
            fix(fixer) {
              return fixer.replaceTextRange(
                range(node.parent.parent),
                `[${node.parent.parent.name}]="${expression}"`
              );
            },
          });
        }

        if (
          ["LiteralPrimitive", "EmptyExpr$1"].includes(
            node.expressions.at(0).type
          )
        ) {
          const property = /^'[^']+'$/.test(expression)
            ? node.parent.parent.name
            : `[${node.parent.parent.name}]`;

          const replacer = String(expression.trim()).replace(
            /^[\'\`\"]|[\'\`\"]$/g,
            ""
          );

          context.report({
            node: node.parent.parent,
            messageId: "interpolation",
            data: {
              theValue: replaceMessage,
            },
            fix(fixer) {
              return fixer.replaceTextRange(
                range(node.parent.parent),
                `${property}="${replacer}"`
              );
            },
          });
        }
      },
    };
  },
};
