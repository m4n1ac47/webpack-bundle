/* global module require */
module.exports = {
    plugins: [
    require('postcss-assets')({
        loadPaths: ['src/assets/fonts/**/*', 'src/assets/img/'],
        relativeTo: 'src/css/'
    }),
    require('postcss-strip-units'),
    require('autoprefixer'),
    require('cssnano')({
        preset: 'default',
    })
    ]
}