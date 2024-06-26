var _a;
const monokaiColorThemeExtension = require('./package.json');
// Default
const themeOneColors = require('./themes/monokai-color-theme.json');
const themes = ((_a = monokaiColorThemeExtension.contributes) === null || _a === void 0 ? void 0 : _a.themes) || [];
const themeOne = themes[0];
themes[0] = Object.assign({}, themeOne, themeOneColors);
export { monokaiColorThemeExtension };
