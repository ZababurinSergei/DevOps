var _a;
const webStormIntelliJExtension = require('./package.json');
// Default
const themeOneColors = require('./themes/darcula-color-theme.json');
const themes = ((_a = webStormIntelliJExtension.contributes) === null || _a === void 0 ? void 0 : _a.themes) || [];
const themeOne = themes[0];
themes[0] = Object.assign({}, themeOne, themeOneColors);
export { webStormIntelliJExtension };
