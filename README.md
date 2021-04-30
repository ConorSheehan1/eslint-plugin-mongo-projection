# eslint-plugin-mongo-projection

eslint rule to catch incorrect use of mongo projections

```javascript
// good
db.collection('foo').find().project({bar: 1})

// bad (works in mongo shell but not node)
db.collection('foo').find({}, {bar: 1})
```

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-mongo-projection`:

```
$ npm install eslint-plugin-mongo-projection --save-dev
```


## Usage

Add `mongo-projection` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "mongo-projection"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "mongo-projection/mongo-projection": 1
    }
}
```

## Important Note
This rule relies on checking for all `memberExpressions` named `find`.
There may be cases you want to ignore.
By default `'_'` is ignored. e.g. `_.find(foo, {bar: 1})`.
You can pass the `excludedParentNames` option to alter what is excluded.
e.g. if you use `lodash.find` instead of `_.find`
```json
{
    "rules": {
        "mongo-projection/mongo-projection": [
            "warn",
            {
                "excludedParentNames": ["lodash"],
            },
        ],
    }
}
```


## Development
See [dev.md](./dev.md)
