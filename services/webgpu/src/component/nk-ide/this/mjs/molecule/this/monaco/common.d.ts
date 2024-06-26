export interface IDisposable {
    dispose(): void;
}
export declare enum KeybindingWeight {
    EditorCore = 0,
    EditorContrib = 100,
    WorkbenchContrib = 200,
    BuiltinExtension = 300,
    ExternalExtension = 400
}
export declare const CATEGORIES: {
    View: {
        value: any;
        original: string;
    };
    Help: {
        value: any;
        original: string;
    };
    Preferences: {
        value: any;
        original: string;
    };
    Developer: {
        value: any;
        original: string;
    };
};
