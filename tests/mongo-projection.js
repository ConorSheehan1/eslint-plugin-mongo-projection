'use strict';

const rule = require('../lib/rules/mongo-projection');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester();

ruleTester.run('mongo-projection', rule, {
  valid: [
    {
      code: 'find()',
    },
    {
      code: "find({}, 'foo')",
    },
    {
      code: 'find({}, () => {})',
      parserOptions: { ecmaVersion: 6 }, // needed for arrow functions
    },
    {
      code: '[1,2,3].find(v => v > 2, {})',
      parserOptions: { ecmaVersion: 6 },
    },
    {
      // this should pass because it's not a member expression.
      // this is a common pattern for lodash finds.
      code: 'find({}, {foo: 1});',
    },
    {
      // this would normally fail since it's a member function named find with an object as the second arg.
      // we check explicitly for this case
      code: '_.find({}, {foo: 1});',
    },
  ],
  invalid: [
    {
      code: 'const collection = () => ({ find: () => {} });\ncollection.find({}, {foo: 1});',
      output: 'const collection = () => ({ find: () => {} });\ncollection.find({}).project({foo: 1});',
      parserOptions: { ecmaVersion: 6 },
      errors: [
        {
          message: 'node mongodb.find does not accept a projection as the second argument. Use find().project() instead.',
          type: 'MemberExpression',
        },
      ],
    },
    {
      code: '({ find: () => {} }).find({}, {})',
      output: '({ find: () => {} }).find({}).project({})',
      parserOptions: { ecmaVersion: 6 },
      errors: [
        {
          message: 'node mongodb.find does not accept a projection as the second argument. Use find().project() instead.',
          type: 'MemberExpression',
        },
      ],
    },
  ],
});
