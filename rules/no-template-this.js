const range = (value) => [
  value.sourceSpan.start,
  value.source.includes(" =$event") // Two-way bindings need the end truncated
    ? value.sourceSpan.end - 8
    : value.sourceSpan.end,
];

const finder = /([^\w]|^)this\./;
const replacer = /([^\w]|^)this\./g;

const hasThis = (strng) => {
  if (!strng) return false;

  return !!finder.exec(strng);
};

function handleContext(context, node, replaceRange, replaceText) {
  context.report({
    node,
    messageId: "this",
    fix(fixer) {
      return fixer.replaceTextRange(replaceRange, replaceText);
    },
  });
}

module.exports = {
  meta: {
    fixable: "code",
    type: "suggestion",
    messages: {
      this: "Unnecessary `this.` in template.",
    },
    docs: {
      description: "Help prevent using unnecessary `this` in templates.",
      url: "",
    },
  },
  create: (context) => {
    let isHandled = false;

    return {
      BoundAttribute(node) {
        if (hasThis(node.value?.source) && !isHandled) {
          isHandled = true;
          handleContext(
            context,
            node,
            range(node.value),
            node.value.source.replace(replacer, "$1")
          );
        }
      },
      BoundEvent(node) {
        if (hasThis(node.handler?.source) && !isHandled) {
          isHandled = true;
          handleContext(
            context,
            node,
            range(node.handler),
            /* The last .replace is necessary for two-way bindings */
            node.handler.source.replace(replacer, "$1").replace(" =$event", "")
          );
        }
      },
    };
  },
};
