const path = require("path");

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
        ["@babel/plugin-transform-named-capturing-groups-regex", { runtime: true }]
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
          stream: require.resolve("stream-browserify"),
          https: require.resolve("https-browserify"),
          http: require.resolve("stream-http"),
          querystring: require.resolve("querystring-es3"),
          url: require.resolve("url/"),
          path: require.resolve("path-browserify")
        },
      };

      webpackConfig.module.rules.push({
        test: /\.wasm$/,
        type: "webassembly/async",
      });

      webpackConfig.module.rules.push({
        test: /\.cjs$/,
        type: 'javascript/auto'
      });

      webpackConfig.module.rules.unshift({
        test: /\.(js|mjs|cjs)$/,
        include: [
          path.resolve(__dirname, "node_modules/@lucid-evolution"),
        ],
        use: {
          loader: require.resolve("babel-loader"),
          options: {
            presets: [
              [require.resolve("@babel/preset-env"), { 
                targets: { ios: "12" },
                modules: false // Important: preserve ES modules
              }]
            ],
            plugins: [
              [require.resolve("@babel/plugin-transform-named-capturing-groups-regex"), { runtime: true }]
            ],
            cacheDirectory: true, // Speed up subsequent builds
            compact: false,
            babelrc: false,
            configFile: false
          }
        }
      });

      return webpackConfig;
    },
  },
};