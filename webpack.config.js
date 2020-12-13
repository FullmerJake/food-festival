const path = require("path");
const webpack = require('webpack');

// First we need to create the main config object within out file. 
// We'll write options within this object to tell webpack what to do. 
module.exports = {
    entry: './assets/js/script.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.bundle.js'
    },
    plugins: [
        // tells webpack that $ and jQuery are part of jquery library.
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
    ],
    mode: 'development'
};