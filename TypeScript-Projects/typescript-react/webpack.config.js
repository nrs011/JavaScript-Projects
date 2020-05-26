var path = require("path");
var config = {
    //entry is referring to the entry point of the application
    entry: ["./app.tsx"],
    //output is referring to an object that accepts two parameters: path to publish bundled files, and filename to the name of your final bundle
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js"
    },
    //resolve is referring to an object that takes in a key called extensions with an array of extensions it should watch out for and compile
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
// module key is referring to an object that has a key called loaders.
    module: {
        //loaders key is an array of objects that defines which webpack plugin/loader
        loaders: [
            {
                //here we test tsx extension and ask webpack to use the ts-loader earlier installed the compilation
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            }
        ]
    }
};

module.exports = config;