module.exports = {
	displayName: "react-utils-elib",
	preset: "../../jest.preset.js",
	transform: {
		"^.+\\.[tj]sx?$": "babel-jest",
	},
	moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
	coverageDirectory: "../../coverage/packages/react-utils-elib",
};
