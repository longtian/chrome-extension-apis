module.exports = {
    entry: {
        "background": "./src/background.js",
        "devtools":"./src/devtools.js",
        "popup":"./src/popup.js"
    },
    output: {
        filename: '[name].js',
        path: './lib'
    },
    module:{
        loaders:[
            {
                test:/\.js$/,
                loader:'babel'
            }
        ]
    }
}
