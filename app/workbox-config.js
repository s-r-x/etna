module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{js,txt,css,png,ico,html,svg,json}'
	],
	swDest: 'dist/service-worker.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};