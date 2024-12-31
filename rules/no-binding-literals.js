module.exports = {
  meta: {
    fixable: "code",
    type: "problem",
    messages: {
      message: "Unnecessary binding of string literal {{ theString }}.",
    },
  },
  create: (context) => {
    const range = (node) => [
      node.sourceSpan.start.offset,
      node.sourceSpan.end.offset,
    ];

    return {
      BoundAttribute(node) {
        if (
          /^'[^']+'$/.test(node.value?.source) &&
          !node.name.startsWith("ng")
        ) {
          context.report({
            node,
            messageId: "message",
            data: { theString: node.value.source },
            fix(fixer) {
              return fixer.replaceTextRange(
                range(node),
                `${node.name}="${node.value.ast.value}"`
              );
            },
          });
        }
      },
    };
  },
};
