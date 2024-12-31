module.exports = {
  meta: {
    fixable: "code",
    type: "problem",
    messages: {
      literal: "Unnecessary binding of string literal {{ theString }}.",
      structural:
        "Pointless structural binding of string literal {{ theString }}.",
    },
  },
  create: (context) => {
    const range = (node) => [
      node.sourceSpan.start.offset,
      node.sourceSpan.end.offset,
    ];

    return {
      BoundAttribute(node) {
        if (/^'[^']+'$/.test(node.value?.source)) {
          if (!node.name.startsWith("ng")) {
            context.report({
              node,
              messageId: "literal",
              data: { theString: node.value.source },
              fix(fixer) {
                return fixer.replaceTextRange(
                  range(node),
                  `${node.name}="${node.value.ast.value}"`
                );
              },
            });
          } else if (
            !["ngSwitchCase", "ngClass", "ngStyle"].includes(node.name)
          ) {
            context.report({
              node,
              messageId: "structural",
              data: { theString: node.value.source },
            });
          }
        }
      },
    };
  },
};
