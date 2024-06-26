var _a;
const defaultColorThemeExtension = require('./package.json');
// The below handle for theme extension is temporary,
// we will automatic load the extension package.
// Default
const defaultDark = require('./themes/dark_defaults.json');
const defaultLight = require('./themes/light_defaults.json');
const defaultHC = require('./themes/hc_black_defaults.json');
// Theme
const darkPlus = require('./themes/dark_plus.json');
Object.assign(darkPlus, defaultDark);
const darkVS = require('./themes/dark_vs.json');
Object.assign(darkVS, defaultDark);
const lightPlus = require('./themes/light_plus.json');
Object.assign(lightPlus, defaultLight);
const lightVS = require('./themes/light_vs.json');
Object.assign(lightVS, defaultLight);
const hcBlack = require('./themes/hc_black.json');
Object.assign(hcBlack, defaultHC);
const themes = ((_a = defaultColorThemeExtension.contributes) === null || _a === void 0 ? void 0 : _a.themes) || [];
const themeDarkPlus = themes[0];
const themeLightPlus = themes[1];
const themeVSDark = themes[2];
const themeVSLight = themes[3];
const themeHCBlack = themes[4];
themes[0] = Object.assign({}, themeDarkPlus, darkPlus);
themes[1] = Object.assign({}, themeLightPlus, lightPlus);
themes[2] = Object.assign({}, themeVSDark, darkVS);
themes[3] = Object.assign({}, themeVSLight, lightVS);
themes[4] = Object.assign({}, themeHCBlack, hcBlack);
export { defaultColorThemeExtension };
