export default {
    extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
    rules: {
      "@typescript-eslint/no-explicit-any": "error", // any 타입 사용을 금지함
    },
  };
  