/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

const stylesHandler = isProduction
    ? MiniCssExtractPlugin.loader
    : "style-loader";

const config = {
    entry: "./src/index.tsx",
    output: {
        clean: true,
        path: path.resolve(__dirname, "dist"),
        filename: "static/[name].[contenthash].js",
    },
    devServer: {
        open: true,
        historyApiFallback: true,
        host: "localhost",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /(dist|node_modules|bower_components)/,
                use: { loader: "ts-loader" },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [stylesHandler, "css-loader", "sass-loader"],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|ico)$/i,
                type: "asset",
            },
            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    resolve: {
        extensions: [".js", ".ts", ".tsx"],
        alias: {
            components: path.resolve(__dirname, "src/components"),
            utils: path.resolve(__dirname, "src/utils"),
            layouts: path.resolve(__dirname, "src/layouts"),
            views: path.resolve(__dirname, "src/views"),
        },
    },
    optimization: {
    // Control if build files are minimized or not
    // minimize: false,
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers
            // (i.e. `terser-webpack-plugin`), uncomment the next line
            "...",
            new CssMinimizerPlugin(),
        ],
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                vendor: {
                    minSize: 1,
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all",
                },
            },
        },
    },
};

if (isProduction) {
    config.mode = "production";

    config.plugins.push(
        new MiniCssExtractPlugin({
            filename: "static/[name].[contenthash].css",
        }),
    );
} else {
    config.mode = "development";
    config.devtool = "inline-source-map";
}

module.exports = config;
