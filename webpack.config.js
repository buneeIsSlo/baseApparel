const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = env => {
    let devType = env.production || false;

    return {
        mode: devType ? "production" : "development",

        entry: {
            app: path.resolve(__dirname, "src/js/app.js")
        },

        output: {
            path: path.resolve(__dirname, "docs"),
            filename: "js/app.[contenthash].bundle.js",
            assetModuleFilename: "imgs/[name][ext]",
            clean: true
        },

        devServer: {
            static: {
                directory: path.resolve(__dirname, "./docs")
            },
            port: 3000 
        },

        module: {
            rules: [
                {
                    test: /(\.html)$/,
                    use: "html-loader"  
                }, 

                {
                    test: /\.(svg|ico|webp|png|jpg|jpeg|gif)$/,
                    type: "asset/resource"
                }
            ]
        },

        plugins: [
            new HtmlWebpackPlugin({
                filename: "index.html",
                template: path.resolve(__dirname, "./src/index.html")
            })
        ]
    };

};