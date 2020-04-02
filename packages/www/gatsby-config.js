module.exports = {
  plugins: [
    {
      resolve: `gastby-plugin-create-client-paths`,
      options: { prefixes: [`/app/*`] }
    }
  ]
};
