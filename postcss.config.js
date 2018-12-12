module.exports = {
    plugins: [
    	require('postcss-assets')({
			loadPaths: ['src/assets/fonts/**/*', 'src/assets/img/'],
			relativeTo: 'src/assets/css/'
		}),
    	require('postcss-strip-units'),
        require('autoprefixer'),
        require('cssnano')({
            preset: 'default',
        })
    ]
}