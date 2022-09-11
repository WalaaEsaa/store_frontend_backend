module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended","prettier"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint","prettier"
    ],
    "rules": {
       // 'no-console':2,
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-var-requires": "error",
        "@typescript-eslint/no-explicit-any": "warn"

    }
}
