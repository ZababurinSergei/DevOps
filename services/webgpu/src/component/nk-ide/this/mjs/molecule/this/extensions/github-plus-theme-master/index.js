var _a;
const githubPlusExtension = require('./package.json');
// Default
const themeOneColors = require('./themes/github-plus-theme.json');
const themes = ((_a = githubPlusExtension.contributes) === null || _a === void 0 ? void 0 : _a.themes) || [];
const themeOne = themes[0];
themes[0] = Object.assign({}, themeOne, themeOneColors);
export { githubPlusExtension };
