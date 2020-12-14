const WebpackPwaManifest = require("webpack-pwa-manifest");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
// const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");


const config = {
  entry: {
    app: './assets/js/script.js',
    events: './assets/js/events.js',
    schedule: './assets/js/schedule.js',
    tickets: './assets/js/tickets.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/dist'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name(file) {
                return '[path][name].[ext]';
              },
              publicPath: function(url) {
                return url.replace('../', '/assets/');
              }
            }
          },
          {
            loader: 'image-webpack-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    }),
    // new invokes a constructor function, after instantiating, we provide a single object as our only argument
    new WebpackPwaManifest({
      name: "Food Event",
      short_name: "Foodies",
      description: "An app that allows you to view upcoming food events.",
      // specifies the homepage for the PWA relative to the location of the manifest file
      start_url: "../index.html",
      background_color: "#01579b",
      theme_color: "#ffffff",
      // fingerprint/inject are specific to the manifest plugin
      //fingerprint tells webpack wether or not to gnerate unique fingerprints so that each time a new manifest is generated, it looks like this: manifest.lhge325d.json
      fingerprints: false,
      // determines whether the link to the manifest.json is added to the HTML
      // since we arent' using fingerprints, we can set this to false.
      inject: false,
      icons: [{
        src: path.resolve("assets/img/icons/icon-512x512.png"),
        sizes: [96, 128, 192, 256, 384, 512],
        // designates where the icon will be sent after the creation of the web manifest is completed by the plugin
        destination: path.join("assets", "icons")
      }]
    })
  ],
  mode: 'development'
};

module.exports = config;
