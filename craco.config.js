const path = require("path");
const fs = require("fs");
const webpack = require('webpack');
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  babel: {
    loaderOptions: (options) => {
      options.presets.push([
        "@babel/preset-env",
        {
          targets: {
            ios: "12", // ensure compatibility with Safari
          },
          useBuiltIns: "entry",
          corejs: 3,
        },
      ]);

      // Ensure consistent "loose" option across related plugins
      options.plugins = [
        ...(options.plugins || []),
        ["@babel/plugin-transform-class-properties", { loose: false }],
        ["@babel/plugin-transform-private-methods", { loose: false }],
        ["@babel/plugin-transform-private-property-in-object", { loose: false }],
        ["@babel/plugin-transform-named-capturing-groups-regex", { runtime: true }],
        // (isProd ? ["transform-remove-console", { exclude: [] }] : [])
      ];

      return options;
    },
  },
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.experiments = {
        asyncWebAssembly: true,
        topLevelAwait: true,
        layers: true,
      };

      webpackConfig.resolve.plugins = webpackConfig.resolve.plugins.filter(
        (plugin) => plugin.constructor.name !== "ModuleScopePlugin"
      );

      webpackConfig.output = {
        ...webpackConfig.output,
        environment: {
          ...webpackConfig.output?.environment,
          asyncFunction: true,
        },
      };

      webpackConfig.resolve = {
        ...webpackConfig.resolve,
        fallback: {
          buffer: require.resolve("buffer"),
          crypto: require.resolve("crypto-browserify"),
          process: require.resolve("process/browser"),
          stream: require.resolve("stream-browserify"),
          https: require.resolve("https-browserify"),
          http: require.resolve("stream-http"),
          querystring: require.resolve("querystring-es3"),
          url: require.resolve("url/"),
          path: require.resolve("path-browserify"),
          zlib: require.resolve("browserify-zlib"),
          util: require.resolve("util/"),
        },
      };

      webpackConfig.resolve.extensions = [
        ...(webpackConfig.resolve.extensions || []),
        ".wasm",
      ];

      const oneOfRule = webpackConfig.module.rules.find(rule => rule.oneOf);
      oneOfRule.oneOf.unshift({
        test: /\.wasm$/,
        type: "webassembly/async",
      });

      webpackConfig.module.rules.push({
        test: /\.cjs$/,
        type: 'javascript/auto'
      });

      // Add ProvidePlugin to automatically inject Buffer globally
      webpackConfig.plugins.push(
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
        })
      );

      // webpackConfig.module.rules.unshift({
      //   test: /\.(js|mjs|cjs)$/,
      //   include: [
      //     path.resolve(__dirname, "node_modules/@lucid-evolution"),
      //     path.resolve(__dirname, "node_modules/cardano-wasm-libs"),
      //     path.resolve(__dirname, "node_modules/cardano-web3-js"),
      //   ],
      //   use: {
      //     loader: require.resolve("babel-loader"),
      //     options: {
      //       presets: [
      //         [require.resolve("@babel/preset-env"), { 
      //           targets: { ios: "12" },
      //           modules: false // Important: preserve ES modules
      //         }]
      //       ],
      //       plugins: [
      //         [require.resolve("@babel/plugin-transform-named-capturing-groups-regex"), { runtime: true }]
      //       ],
      //       cacheDirectory: true, // Speed up subsequent builds
      //       compact: false,
      //       babelrc: false,
      //       configFile: false
      //     }
      //   }
      // });

      const terserPlugin = webpackConfig.optimization.minimizer.find(
        (plugin) => plugin.constructor.name === 'TerserPlugin'
      );

      if (terserPlugin) {
        terserPlugin.options.minimizer.options = {
          ...terserPlugin.options.minimizer.options,
          mangle: {
            safari10: true,
            keep_fnames: true,
          },
        };
      }

      return webpackConfig;
    },
  },
  devServer: {
    server: {
      type: 'http',
      // options: {
      //   key: fs.readFileSync(path.resolve(__dirname, './localhost+3-key.pem')),
      //   cert: fs.readFileSync(path.resolve(__dirname, './localhost+3.pem')),
      // },
    },
    host: '0.0.0.0',
    port: 3000,
  },
};