export var AuxiliaryEventKind;
(function (AuxiliaryEventKind) {
    AuxiliaryEventKind["onTabClick"] = "AuxiliaryBar.onClick";
})(AuxiliaryEventKind || (AuxiliaryEventKind = {}));
export class AuxiliaryModel {
    constructor(mode = 'default', data = [], current, children) {
        this.mode = 'default';
        this.data = [];
        this.mode = mode;
        this.children = children;
        this.data = data;
        this.current = current;
    }
}
