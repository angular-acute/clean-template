module.exports = {
  meta: { fixable: 'code', type: 'layout' },
  create: (context) => {
    const range = (node) => [
      node.sourceSpan.start.offset,
      node.sourceSpan.end.offset,
    ];

    return {
      Interpolation$1(node) {
        if (node.parent?.parent?.type !== 'BoundAttribute') return;

        if (node.expressions.length === 1) {
          if (
            ['Call', 'PropertyRead'].includes(node.expressions.at(0).type) &&
            !node.strings.filter((str) => str).length
          ) {
            const replacer = node.parent.source
              .replace(/^\{\{|\}\}$/g, '') // Remove squiggly-brackets
              .replace(/[\r\n]/g, '') // Remove newlines
              .replace(/ +/g, ' ') // Remove excess spaces
              .trim(); // And trim

            context.report({
              node: node.parent.parent,
              message:
                "Prefer binding '{{theVariable}}', rather than interpolating.",
              data: {
                theVariable:
                  node.expressions.at(0).type === 'Call'
                    ? `${node.expressions.at(0).receiver.name}(...)`
                    : replacer,
              },
              fix(fixer) {
                return fixer.replaceTextRange(
                  range(node.parent.parent),
                  `[${node.parent.parent.name}]="${replacer}"`
                );
              },
            });
          }

          if (['LiteralPrimitive'].includes(node.expressions.at(0).type)) {
            context.report({
              node: node.parent.parent,
              message: "Unnecessary interpolation of '{{theValue}}'.",
              data: {
                theValue: node.expressions.at(0).value,
              },
              fix(fixer) {
                return fixer.replaceTextRange(
                  range(node.parent.parent),
                  `${node.parent.parent.name}="${node.expressions.at(0).value}"`
                );
              },
            });
          }
        }
      },
    };
  },
};
