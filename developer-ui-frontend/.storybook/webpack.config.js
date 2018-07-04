// load the default config generator.
var genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');
var path = require("path");
var fileLoaderConfig = {
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      publicPath: './',
      outputPath: 'images/'
    }
};

module.exports = (baseConfig, env) => {
  var config = genDefaultConfig(baseConfig, env);
  // Modify default baseConfig: Change Regex of File Loader to not match svg
  // (Only used with svg in an s?css context. Usually svg is handled by react-svg-loader)
  var defaultFileLoaderRegex = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/;
  var newFileLoaderRegex = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/;
  config.module.rules.find(rule =>
    rule.test.toString() === defaultFileLoaderRegex.toString()).test = newFileLoaderRegex;
  // Extend default baseConfig...
  config.module.rules.push(
    {
      test: /\.(s?css|sass)$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    },
    {
      test: /\.svg$/, // inline svg as react elements in JSX
      issuer: /\.jsx?$/,
      use: [
        {
          loader: "babel-loader"
        },
        {
          loader: "react-svg-loader",
          options: {
            jsx: true, // true outputs JSX tags
            match: /\.jsx?/
          }
        }
      ]
    },
    {
      test: /\.svg$/,
      issuer: /\.(s?css|sass)$/,
      use: [
        fileLoaderConfig
      ]
    }
  );

  config.resolve.modules.push(path.resolve('src'));
  return config;
};
