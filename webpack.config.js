var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = (env, arg) => {
    return {
        entry: "./src/index.tsx",
        mode: arg,
        output: {
            filename: "bundle.js",
            path: __dirname + "/docs"
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: 'index.html',
            })
        ],

        // Use source-map to map typescript files to javascript for debugging purposes.
        devtool: "source-map",

        resolve: {
            extensions: [".ts", ".tsx", ".js", ".json"]
        },

        module: {
            rules: [
                // Use awesome-typescript-loader on our TSX files.
                { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

                // Use source-map-loader on our JS files.
                { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

                { test: /\.css$/, use: ['style-loader', 'css-loader'], },
            ]
        },

        externals: {
            "react": "React",
            "react-dom": "ReactDOM"
        }
    }
};
