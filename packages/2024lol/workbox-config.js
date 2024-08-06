module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{js,jpg,ico,txt,html,json,png}'
	],
	swDest: 'dist/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};