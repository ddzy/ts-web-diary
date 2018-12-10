const tsImportPluginFactory = require('ts-import-plugin')
const { getLoader } = require("react-app-rewired");

module.exports = function override(config) {
  const tsLoader = getLoader(
    config.module.rules,
    (rule) =>
      rule.loader &&
      typeof rule.loader === 'string' &&
      rule.loader.includes('ts-loader')
  );

  tsLoader.options = {
    transpileOnly: true,
    getCustomTransformers: () => ({
      before: [ tsImportPluginFactory({
        libraryDirectory: 'es',
        libraryName: 'antd',
        style: 'css',
      }) ]
    }),
    compilerOptions: {
      module: 'es2015'
    },
  };

  return config;
}