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
    const range = (node,plus) => [
      node.sourceSpan.start.offset,
      node.sourceSpan.end.offset+(plus?1:0),
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
            !["ngSwitchCase", "ngSwitchDefault", "ngClass", "ngStyle"].includes(node.name)
          ) {
            context.report({
              node,
              messageId: "structural",
              data: { theString: node.value.source },
            });
        } else if (
           (node.name)==="ngSwitchDefault"
        ) {
          context.report({
            node,
            messageId: "structural",
            data: { theString: node.value.source },
            fix(fixer) {
              return fixer.replaceTextRange(
                range(node,true),
                `${node.name}`
              );
            },
        });
        }
      }
    }
          };
  },
};
