module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": ["error", { printWidth: 144 }],
    "max-len": ["error", { code: 144 }],
  },
  extends: ["eslint:recommended", "prettier"],
};
