import { IColorTheme } from './../../../this/model/colorTheme';
import { editor as MonacoEditor } from 'monaco-editor';
/**
 * This function convert colors object to CSS variables, and add it to the :root {}.
 * The default color id default contains dot punctuation, so there we convert the `.` to `-`.
 * More about the color token id, you need visit: https://code.visualstudio.com/api/references/theme-color
 * @param colors
 */
export declare function convertToCSSVars(colors: object): string;
export declare function getThemeData(theme: IColorTheme): MonacoEditor.IStandaloneThemeData;
