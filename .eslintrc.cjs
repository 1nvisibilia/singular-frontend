/* eslint-env node */
module.exports = {
	"root": true,
	"extends": [
		"plugin:vue/vue3-essential",
		"eslint:recommended"
	],
	"env": {
		"vue/setup-compiler-macros": true,
		"browser": true,
		"commonjs": true,
		"es2021": true
	},
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		]
	}
};
