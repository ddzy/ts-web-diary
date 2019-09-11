const tsImportPluginFactory = require('ts-import-plugin')
const { getLoader } = require("react-app-rewired");
const rewireReactHotLoader = require('react-app-rewire-hot-loader')
const rewireLess = require('react-app-rewire-less');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');


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
    },
  })(config, env);

  config.plugins.push(
    new MonacoWebpackPlugin({
      languages: [
        'html', 'css', 'javascript', 'typescript',
        'less', 'json', 'xml', 'php',
        'markdown', 'go', 'cpp', 'java',
      ],
    }),
  );

  return config;
}