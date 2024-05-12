module.exports = {
	env: {
		es6: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/eslint-recommended",
		"prettier",
		"react-app",
	],
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly",
	},
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: "module",
	},
	plugins: ["react", "@typescript-eslint"],
	rules: {
		indent: ["error", "tab"],
		"linebreak-style": ["error", "windows"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
		"arrow-parens": ["error", "as-needed"], // a => {}
		"no-param-reassign": ["error", { props: false }],
		"no-unused-expressions": [
			"error",
			{
				allowTernary: true, // a || b
				allowShortCircuit: true, // a ? b : 0
				allowTaggedTemplates: true,
			},
		],
		"import/no-extraneous-dependencies": [
			"error",
			{ devDependencies: true },
		],
		"max-len": [
			"error",
			{
				code: 120,
				ignoreComments: true,
				ignoreStrings: true,
				ignoreTemplateLiterals: true,
			},
		], // prettier의 printWidth 옵션 대신 사용
		"prettier/prettier": [
			"error",
			{
				endOfLine: "auto",
			},
		],
	},
};
