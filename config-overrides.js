const tsImportPluginFactory = require('ts-import-plugin')
const { getLoader } = require("react-app-rewired");
const rewireReactHotLoader = require('react-app-rewire-hot-loader')
const rewireLess = require('react-app-rewire-less');


module.exports = function override(config, env) {

  // ** hot-module-replace **
  config = rewireReactHotLoader(config, env);

  // ** antd **
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
      before: [tsImportPluginFactory({
        libraryDirectory: 'es',
        libraryName: 'antd',
        // style: 'css',
        style: true,
      })]
    }),
    compilerOptions: {
      module: 'es2015'
    },
  };

  config = rewireLess.withLoaderOptions({
    javascriptEnabled: true,
    modifyVars: {
      "@primary-color": "#1DA57A",
      '@link-color': '#000',
    },
  })(config, env);

  return config;
}