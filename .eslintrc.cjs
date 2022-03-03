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
	"parserOptions": {
		"ecmaVersion": "latest"
	},
	"rules": {
		"indent": [
			"error",
			"tab",
			{
				"SwitchCase": 1
			}
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
