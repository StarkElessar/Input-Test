const path                    = require('path'),
      webpack                 = require('webpack'),
      HTMLWebpackPlugin       = require('html-webpack-plugin'),
      { CleanWebpackPlugin }  = require('clean-webpack-plugin'),
      MiniCssExtractPlugin    = require("mini-css-extract-plugin"),
      CssMinimizerPlugin      = require("css-minimizer-webpack-plugin"),
      TerserWebpackPlugin     = require("terser-webpack-plugin")

module.exports = (env, args) => {
  const isDevelopment = args.mode === "development"

  const optimization = () => {
    const config = {}

    if (!isDevelopment) {
      config.minimizer = [
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: ["default", { discardComments: { removeAll: true } }],
          },
        }),
        new TerserWebpackPlugin({
          terserOptions: {
            output: {
              comments: false,
            },
          },
          extractComments: false,
        }),
      ];
    }
    return config
  }

  return {
    mode: isDevelopment ? 'development' : 'production',
    entry: {
      bundle: './src/index.js'
    },
    output: {
      clean: true,
      path: path.resolve(__dirname, 'dist'),
      filename: 'script.[name].js',
      assetModuleFilename: 'assets/[name][ext][query]',
    },
    devServer: {
      watchFiles: path.resolve(__dirname, 'dist'),
      https: true,
      historyApiFallback: true,
      open: true,
      compress: false,
      hot: true,
      port: 8080,
      host: 'localhost',
    },

    optimization: optimization(),

    plugins: [
      new HTMLWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.html'),
        inject: 'body',
        scriptLoading: 'blocking'
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],

    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.(sa|sc|c)ss$/i,
          exclude: /\.module.(s[ac]ss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: isDevelopment,
              },
            },
            "postcss-loader",
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDevelopment,
                sassOptions: {
                  outputStyle: isDevelopment ? 'compressed' : 'expanded',
                },
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i,
          type: 'asset/resource',
          generator: {
            filename: "assets/images/[name][ext][query]",
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/fonts/[name][ext][query]",
          },
        },
      ]
    }
  }
}