"use strict";
var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require("autoprefixer");

// Loader Configurations
var postCssConfig = {
  loader: "postcss-loader",
  options: {
    ident: "postcss",
    sourceMap: true,
    plugins: () => [
      require("postcss-flexbugs-fixes"),
      autoprefixer({
        browsers: [
          ">1%",
          "last 4 versions",
          "Firefox ESR",
          "not ie < 9" // React doesn't support IE8 anyway
        ],
        flexbox: "no-2009"
      })
    ]
  }
};
// Environment specific Profiles
var isProd = process.env.NODE_ENV === "production";
var devProfile = {
  css: [
    { loader: "style-loader", options: { sourceMap: true } },
    { loader: "css-loader", options: { sourceMap: true, importLoaders: 1 } },
    postCssConfig,
    { loader: "sass-loader", options: { sourceMap: true } }
  ],
  publicPath: "/", // Webpack Dev Server is started on root -> always serve on root
  fileLoaderPublicPath: "/"
};
var prodProfile = {
  css: ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: ["css-loader", postCssConfig, "sass-loader"],
    publicPath: path.resolve(__dirname, "target/classes/public")
  }),
  publicPath: process.env.PUBLIC_PATH,
  fileLoaderPublicPath: process.env.PUBLIC_PATH
};
var cssConfig = isProd ? prodProfile.css : devProfile.css;
var publicPathConfig = isProd ? prodProfile.publicPath : devProfile.publicPath;
var fileLoaderPublicPathConfig = isProd
  ? prodProfile.fileLoaderPublicPath
  : devProfile.fileLoaderPublicPath;

var fileLoaderConfig = {
  loader: "file-loader",
  options: {
    name: "[name].[ext]",
    outputPath: "images/",
    publicPath: fileLoaderPublicPathConfig
  }
};
console.log(
  isProd ? "Using Production Build Profile" : "Using Development Build Profile"
);
console.log("publicPath: ", publicPathConfig);
console.log("fileLoaderPublicPath: ", fileLoaderPublicPathConfig);

// Actual configuration object
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "target/classes/public"),
    filename: "app.bundle.js",
    publicPath: publicPathConfig
  },
  stats: { errorDetails: true },
  devtool: isProd ? "source-map" : "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.(s?css|sass)$/,
        use: cssConfig
      },
      {
        test: /\.svg$/, // inline svg as react elements in JSX (.js Files)
        issuer: /\.jsx?$/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "react-svg-loader",
            options: {
              svgo: {
                plugins: [{ removeUselessDefs: false, cleanupIDs: false }]
              },
              jsx: true, // true outputs JSX tags
              match: /\.jsx?/
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/,
        use: [fileLoaderConfig]
      },
      {
        test: /\.svg$/,
        issuer: /\.(s?css|sass)$/,
        use: [fileLoaderConfig]
      },
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          quiet: true // Process and report errors only!
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  resolve: {
    modules: [path.join(__dirname, "src"), "node_modules"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Dev UI",
      favicon: path.join(__dirname, "src/images/favicon.ico"),
      minify: {
        collapseWhitespace: isProd
      },
      hash: true,
      template: "./src/index.html"
    }),
    new ExtractTextPlugin({
      filename: "app.css",
      disable: !isProd,
      allChunks: true
    }),
    // Makes some environment variables available to the JS code
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.PUBLIC_PATH": JSON.stringify(process.env.PUBLIC_PATH)
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          configFile: ".eslintrc",
          failOnWarning: false,
          failOnError: false
        }
      }
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 9000,
    stats: "errors-only"
  }
};
