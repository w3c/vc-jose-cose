module.exports = [{
    mode: 'development',
    entry: './index.js',
    plugins: [],
    watch: true,
    resolve: {
        fallback: { crypto: false },
    },
}];
