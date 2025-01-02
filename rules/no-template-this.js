module.exports = {
  meta: { 
    fixable: 'code'
    , type: 'suggestion' , messages: {
       this:'Unnecessary `this.` in template.'
    },
    docs: {
      description:
        "Help prevent using unnecessary `this` in templates.",
      url: "",
    },
  },
  create: (context) => {
    const range = (value) => [
      value.sourceSpan.start,
      value.source.includes(' =$event') // Two-way bindings need the end truncated
        ? value.sourceSpan.end - 8
        : value.sourceSpan.end,
    ];

    return {
      BoundAttribute(node) {
        if (node.value?.source?.startsWith('this.')) {
          context.report({
            node,
            messageId: 'this',
            fix(fixer) {
              return fixer.replaceTextRange(
                range(node.value),
                node.value.source.replace('this.', '')
              );
            },
          });
        }
      },
      BoundEvent(node) {
        if (node.handler?.source?.startsWith('this.')) {
          context.report({
            node,
            messageId: 'this',
            fix(fixer) {
              return fixer.replaceTextRange(
                range(node.handler),
                node.handler.source.replace('this.', '').replace(' =$event', '') // The last .replace is necessary for two-way bindings
              );
            },
          });
        }
      },
    };
  },
};
