const tsImportPluginFactory = require('ts-import-plugin')
const { getLoader } = require("react-app-rewired");
const rewireReactHotLoader = require('react-app-rewire-hot-loader')


module.exports = function override(config, env) {

  // ** hot-module-replace **
  config = rewireReactHotLoader(config, env);

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