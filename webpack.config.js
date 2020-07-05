module.exports = {
    devServer: {
        open: true,
    },
    rules: [
        {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: "sass-loader",
                },
            ],
        },
    ],
};
