# Debugging
Debugging eslint rules can be tricky because of circular references.
To get around this issue, use the util module (in the standard lib for node, but still require import)
```javascript
"use strict";


module.exports = {
  create(context) {
    return {
      ['CallExpression[callee.name="find"]']: function (node) {
        
        // add inspect to avoid console logging circular reference error
        const { inspect } = require('util');
        console.log(inspect(node)); // this should work
        // console.log(JSON.stringify(node, null, 2)) // this would fail
        
        // ...
      },
    };
  },
};
```

# AST Explorer
I found https://astexplorer.net/ very helpful.
You can see the ast representation of code, and even the output of fixers you define!

# Eslint itself
Various eslint docs I found helpful
1. https://eslint.org/docs/developer-guide/working-with-rules
2. https://eslint.org/docs/4.0.0/developer-guide/working-with-plugins
3. https://eslint.org/docs/developer-guide/nodejs-api#ruletester
4. https://eslint.org/docs/user-guide/configuring/rules#configuring-rules