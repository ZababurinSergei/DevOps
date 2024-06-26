export var MarkerSeverity;
(function (MarkerSeverity) {
    MarkerSeverity[MarkerSeverity["Hint"] = 1] = "Hint";
    MarkerSeverity[MarkerSeverity["Info"] = 2] = "Info";
    MarkerSeverity[MarkerSeverity["Warning"] = 4] = "Warning";
    MarkerSeverity[MarkerSeverity["Error"] = 8] = "Error";
})(MarkerSeverity || (MarkerSeverity = {}));
export var ProblemsEvent;
(function (ProblemsEvent) {
    ProblemsEvent["onSelect"] = "problems.onSelect";
})(ProblemsEvent || (ProblemsEvent = {}));
export class ProblemsModel {
    constructor(id = '', name = '', data = [], show = false) {
        this.id = id;
        this.name = name;
        this.show = show;
        this.data = data;
    }
}
