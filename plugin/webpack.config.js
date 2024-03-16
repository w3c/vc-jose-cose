const webpack = require('webpack');

module.exports = [{
    mode: 'development',
    entry: './index.js',
    plugins: [
        // new webpack.ProvidePlugin({
        //     process: 'process/browser.js',
        //     Buffer: ['buffer', 'Buffer'],
        // }),
    ],
    watch: true,
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
        fallback: {
            // buffer: require.resolve("buffer/"),
            crypto: false // require.resolve("crypto-browserify"),
            // stream: require.resolve("stream-browserify"),
            // vm: require.resolve("vm-browserify"),
            // util: require.resolve("node-util"),
        },
    },
}];