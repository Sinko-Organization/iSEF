/* eslint-disable no-undef */
/** @type {import('prettier').Options} */
module.exports = {
  arrowParens: "always",
  printWidth: 80,
  singleQuote: false,
  jsxSingleQuote: false,
  semi: true,
  trailingComma: "all",
  tabWidth: 2,
  importOrder: ["^((../)+|./).*(?<!server.mjs)$", "server.mjs$"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [require("@trivago/prettier-plugin-sort-imports")],
};
