'use strict';

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Use .project instead of second arg of find. See also https://stackoverflow.com/a/51732851/6305204',
      url: 'http://mongodb.github.io/node-mongodb-native/3.6/api/BulkOperationBase.html#find',
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          excludedParentNames: {
            type: 'array',
          },
        },
      },
    ],
  },

  create (context) {
    return {
      'MemberExpression[property.name="find"]': node => {
        // [1,2,3].find(v => v > 1)
        if (node.object.type === 'ArrayExpression') return;

        const findArgs = node.parent.arguments;
        // db.collection.find({})
        if (findArgs.length < 2) return;

        const secondArg = findArgs[1];
        // find({}, () => {})
        if (typeof secondArg.value !== 'object' && secondArg.type !== 'ObjectExpression') return;

        // _.find([{a: 1}, {a: 2}], {a: 1}) excluded by default
        const ruleOptions = context.options[0];
        const excludedParentNames = (ruleOptions !== undefined && ruleOptions.excludedParentNames) ? ruleOptions.excludedParentNames : ['_'];
        if (excludedParentNames.includes(node.parent.callee.object.name)) return;

        context.report({
          node,
          message: 'node mongodb.find does not accept a projection as the second argument. Use find().project() instead.',
          fix: fixer => {
            const sourceCode = context.getSourceCode();
            const [firstArg, secondArg] = node.parent.arguments;
            const secondArgSourceCode = sourceCode.getText(secondArg);

            return [
              // range[1] new syntax for assert.isDefined(value, "[message]");
              // can't just remove node, doesn't handle comma e.g. find({}, {foo: 1}) -> find({}, )
              fixer.removeRange([firstArg.range[1], secondArg.range[1]]),
              fixer.insertTextAfter(node.parent, `.project(${secondArgSourceCode})`),
            ];
          },
        });
      },
    };
  },
};
