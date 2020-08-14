const path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    WebpackPwaManifest = require('webpack-pwa-manifest'),
    workboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    devServer: {
        inline: false
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                loader: "style-loader"
            },
            {
                loader: "css-loader"
            }
            ]
        },
        {
            test: /\.(png|jp(e*)g|svg|gif|webp)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8000, // Convert images < 8kb to base64 strings
                    name: 'img/[hash]-[name].[ext]'
                }
            }]
        }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/pages/match.html",
            filename: "match.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/pages/league.html",
            filename: "league.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/pages/favorite.html",
            filename: "favorite.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/components/navbar/navbar.html",
            filename: "navbar.html"
        }),
        new WebpackPwaManifest({
            name: 'Live Score',
            short_name: 'Live Score',
            description: 'Live Scores displays the results of soccer matches from more than 600 soccer leagues. Follow match results, statistics, standings, match schedules and videos from Champions League.',
            background_color: '#ff5c62',
            icons: [
                {
                    src: path.resolve('src/public/img/icon-192.png'),
                    sizes: '192x192'
                },
                {
                    src: path.resolve('src/public/img/icon-256.png'),
                    size: '256x256'
                },
                {
                    src: path.resolve('src/public/img/icon-512.png'),
                    size: '512x512',
                }
            ],
            gcm_sender_id: '730746835214'
        }),
        new workboxPlugin.InjectManifest({
            swSrc: './src/sw.js',
            swDest: 'sw.js'
        })
    ],
};