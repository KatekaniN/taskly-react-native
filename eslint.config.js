const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ["dist/*"],
  },
  {
    plugins: ["react-native"],
    rules: {
      // Enable the no-unused-styles rule
      "react-native/no-unused-styles": "error"

      // You can add other react-native rules as needed:
      // "react-native/no-inline-styles": "warn",
      // "react-native/no-color-literals": "warn",
    }
  }
]);