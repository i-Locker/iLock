module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: [
    "prettier",
    "eslint:recommended",
    "plugin:react/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "jsx-a11y", "json", "prettier", "react-hooks"],
  rules: {
    "react/no-unknown-property":"warn", 
    "react/prop-types": "off",
    "react-hooks/exhaustive-deps": "off",
    "no-var": "warn",
    "brace-style": "warn",
    "no-extra-semi": "warn",
    "no-mixed-spaces-and-tabs": "warn",
    "prefer-template": "warn",
    "no-unused-vars": "warn",
    "radix": "warn",
    "space-before-blocks": "warn",
    "import/prefer-default-export": "off",
  },
  globals: {
    React: "writable",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};