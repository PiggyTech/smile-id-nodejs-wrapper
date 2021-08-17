export default {
  extends: "airbnb-base",
  env: {
    mocha: true,
  },
  plugins: ["mocha"],
  rules: {
    "mocha/no-exclusive-tests": "error",
  },
};
