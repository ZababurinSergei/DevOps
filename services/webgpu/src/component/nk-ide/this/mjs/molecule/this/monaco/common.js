import { localize } from 'monaco-editor/esm/vs/nls';
export var KeybindingWeight;
(function (KeybindingWeight) {
    KeybindingWeight[KeybindingWeight["EditorCore"] = 0] = "EditorCore";
    KeybindingWeight[KeybindingWeight["EditorContrib"] = 100] = "EditorContrib";
    KeybindingWeight[KeybindingWeight["WorkbenchContrib"] = 200] = "WorkbenchContrib";
    KeybindingWeight[KeybindingWeight["BuiltinExtension"] = 300] = "BuiltinExtension";
    KeybindingWeight[KeybindingWeight["ExternalExtension"] = 400] = "ExternalExtension";
})(KeybindingWeight || (KeybindingWeight = {}));
export const CATEGORIES = {
    View: { value: localize('view', 'View'), original: 'View' },
    Help: { value: localize('help', 'Help'), original: 'Help' },
    Preferences: {
        value: localize('preferences', 'Preferences'),
        original: 'Preferences',
    },
    Developer: {
        value: localize({
            key: 'developer',
            comment: [
                'A developer on Code itself or someone diagnosing issues in Code',
            ],
        }, 'Developer'),
        original: 'Developer',
    },
};
