module.exports = {
	root: true,
	extends: [
		"react-app",
		"airbnb",
		"plugin:import/typescript",
		"plugin:react/jsx-runtime", // react/react-in-jsx-scope 무시
		"eslint-config-prettier", // eslint에서 prettier와 겹치는 설정 끄는 플러그인, 가장 마지막으로 이동, "prettier"로 줄여써도 괜찮음
	],
	rules: {
		"linebreak-style": 0,
		quotes: ["error", "double"],
		"no-tabs": 0,
		"react/jsx-filename-extension": ["error", { extensions: [".ts", ".tsx"] }],
		"import/no-unresolved": 0,
		"import/extensions": [
			"error",
			"ignorePackages",
			{
				ts: "never",
				tsx: "never",
			},
		],
		"react/require-default-props": 0,
		"react/destructuring-assignment": 0,
		"react/jsx-indent": ["error", "tab"], // jsx에서도 indent tab으로 통일
		"react/jsx-indent-props": [1, "tab"],
		"react/jsx-closing-bracket-location": [1, "after-props"],
		"implicit-arrow-linebreak": 0, // => 화살표 옆에 바로 코드가 오는지
		"no-unused-vars": 0, // typescript/no-unused-vars 사용을 위해 비활성화
	},
	settings: {
		react: {
			version: "detect", // 프로젝트에 설치된 리액트 버전을 자동으로 감지하도록 설정
		},
	},
};
