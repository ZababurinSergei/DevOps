/**
 * The Settings configuration event definition
 */
export var SettingsEvent;
(function (SettingsEvent) {
    /**
     * The settings content changed
     */
    SettingsEvent["OnChange"] = "settings.onchange";
})(SettingsEvent || (SettingsEvent = {}));
export class SettingsModel {
    constructor(colorTheme, editor, locale) {
        this.colorTheme = colorTheme;
        this.editor = editor;
        this.locale = locale;
    }
}
