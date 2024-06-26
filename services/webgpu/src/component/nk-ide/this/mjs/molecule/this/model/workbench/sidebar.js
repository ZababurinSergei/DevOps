export class SidebarModel {
    constructor(panes = [], selected = '') {
        this.panes = panes;
        this.current = selected;
    }
}
