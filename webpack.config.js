/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = () => {
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
            hot: true,
            historyApiFallback: true,
            host: "localhost",
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/index.html",
                filename: "index.html",
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
                    use: [
                        stylesHandler,
                        {
                            loader: "css-loader",
                            options: {
                                modules: true,
                            },
                        },
                        "resolve-url-loader",
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true, // <-- !!IMPORTANT!!
                            },
                        },
                    ],
                },
                {
                    test: /\.svg$/i,
                    issuer: /\.[jt]sx?$/,
                    use: ["@svgr/webpack"],
                },
                {
                    test: /\.(eot|ttf|woff|woff2|png|jpg|gif|ico)$/i,
                    type: "asset",
                },
            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
            ],
        },
        resolve: {
            extensions: [".js", ".ts", ".tsx"],
            modules: [path.resolve(__dirname, "src"), "node_modules"],
            alias: {
                components: path.resolve(__dirname, "src/components"),
                declarations: path.resolve(__dirname, "src/declarations"),
                utils: path.resolve(__dirname, "src/utils"),
                views: path.resolve(__dirname, "src/views"),
                store: path.resolve(__dirname, "src/store"),
                assets: path.resolve(__dirname, "src/assets"),
                modules: path.resolve(__dirname, "src/modules"),
                hooks: path.resolve(__dirname, "src/hooks"),
                services: path.resolve(__dirname, "src/services"),
                db: path.resolve(__dirname, "src/db"),
                styles: path.resolve(__dirname, "src/styles"),
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

    return config;
};
