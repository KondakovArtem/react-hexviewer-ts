//const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

// module.exports = {
//   webpack: {
//     plugins: [
//       new MonacoWebpackPlugin({
//         // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
//         languages: ['json', 'javascript', 'typescript'],
//       }),
//     ],
//   },
// };

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      return webpackConfig;
    },
  },
};
