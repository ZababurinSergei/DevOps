var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { EditorTreeEvent } from './../../../../this/model/workbench/explorer/editorTree';
import { Component } from './../../../../this/react';
import { EditorService } from './../../../../this/services';
import { container, singleton } from 'tsyringe';
let EditorTreeService = class EditorTreeService extends Component {
    constructor() {
        super();
        this.editorService = container.resolve(EditorService);
        this.state = this.editorService.getState();
    }
    onClose(callback) {
        this.subscribe(EditorTreeEvent.onClose, callback);
    }
    onCloseOthers(callback) {
        this.subscribe(EditorTreeEvent.onCloseOthers, callback);
    }
    onCloseSaved(callback) {
        this.subscribe(EditorTreeEvent.onCloseSaved, callback);
    }
    onSelect(callback) {
        this.subscribe(EditorTreeEvent.onSelect, callback);
    }
    onCloseAll(callback) {
        this.subscribe(EditorTreeEvent.onCloseAll, callback);
    }
    onSaveAll(callback) {
        this.subscribe(EditorTreeEvent.onSaveAll, callback);
    }
    onToolbarClick(callback) {
        this.subscribe(EditorTreeEvent.onToolbarClick, callback);
    }
    onLayout(callback) {
        this.subscribe(EditorTreeEvent.onSplitEditorLayout, callback);
    }
    onContextMenu(callback) {
        this.subscribe(EditorTreeEvent.onContextMenu, callback);
    }
};
EditorTreeService = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], EditorTreeService);
export { EditorTreeService };
