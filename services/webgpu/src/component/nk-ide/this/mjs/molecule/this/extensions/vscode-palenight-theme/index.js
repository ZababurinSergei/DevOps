var _a;
const paleNightColorThemeExtension = require('./package.json');
// Default
const themeColors = require('./themes/palenight-mild-contrast.json');
const themes = ((_a = paleNightColorThemeExtension.contributes) === null || _a === void 0 ? void 0 : _a.themes) || [];
const themeZero = themes[0];
themes[0] = Object.assign({}, themeZero, themeColors);
export { paleNightColorThemeExtension };
