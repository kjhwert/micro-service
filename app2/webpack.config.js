const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { ModuleFederationPlugin } = require('@module-federation/enhanced');

/**
 * @type {import('webpack').Configuration}
 **/
const webpackConfig = {
    entry: './src/index',
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        port: 3002,
    },
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
        modules: [path.resolve(__dirname, "./src"), "node_modules"],

    },
    output: {
        publicPath: 'auto',
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                type: 'javascript/auto',
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.(js|jsx|ts|tsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-react'],
                },
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'app2',
            filename: 'remoteEntry.js',
            exposes: {
                './Hello': './src/components/Hello',
            },
            shared: {
                react: {
                    singleton: true,
                    eager: true,
                },
                'react-dom': {
                    // import: 'react-dom', // the "react" package will be used a provided and fallback module
                    // shareKey: 'react-dom', // under this name the shared module will be placed in the share scope
                    // shareScope: 'legacy', // share scope with this name will be used
                    singleton: true, // only a single version of the shared module is allowed
                    eager: true,
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
};

module.exports = webpackConfig;
