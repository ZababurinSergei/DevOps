var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import 'reflect-metadata';
import { ProblemsModel, MarkerSeverity, ProblemsEvent, } from './../../this/model/problems';
import { StatusBarService, BuiltinService, } from './../../this/services';
import { Component } from './../../this/react';
import { singleton, container } from 'tsyringe';
import { searchById } from './../../this/common/utils';
import logger from './../../this/common/logger';
let ProblemsService = class ProblemsService extends Component {
    constructor() {
        super();
        this.getProblemsMarkers = (data) => {
            let warnings = 0;
            let errors = 0;
            let infos = 0;
            const loopTreeNode = (tree) => {
                tree.forEach((element) => {
                    switch (element.value.status) {
                        case MarkerSeverity.Info:
                            infos += 1;
                            break;
                        case MarkerSeverity.Error:
                            errors += 1;
                            break;
                        case MarkerSeverity.Warning:
                            warnings += 1;
                            break;
                        default:
                    }
                    if (element.children && element.children.length) {
                        loopTreeNode(element.children);
                    }
                });
            };
            loopTreeNode(data);
            return {
                warnings,
                errors,
                infos,
            };
        };
        this.state = container.resolve(ProblemsModel);
        this.statusBarService = container.resolve(StatusBarService);
        this.builtinService = container.resolve(BuiltinService);
    }
    toggleProblems() {
        this.setState(Object.assign(Object.assign({}, this.state), { show: !this.state.show }));
    }
    add(item) {
        const problems = Array.isArray(item) ? item : [item];
        const { data } = this.state;
        problems.forEach((problem) => {
            const index = data.findIndex(searchById(problem.id));
            if (index > -1) {
                data.splice(index, 1, problem);
            }
            else {
                data.push(problem);
            }
        });
        this.setState({
            data: [...data],
        }, () => {
            this.updateStatusBar();
        });
    }
    update(item) {
        const problems = Array.isArray(item) ? item : [item];
        const { data } = this.state;
        problems.forEach((problem) => {
            const index = data.findIndex(searchById(problem.id));
            if (index > -1) {
                data.splice(index, 1, problem);
            }
            else {
                logger.error(`Update problems failed, because there is no problem found via ${problem.id}`);
            }
        });
        this.setState({
            data: [...data],
        }, () => {
            this.updateStatusBar();
        });
    }
    remove(id) {
        const ids = Array.isArray(id) ? id : [id];
        const { data = [] } = this.state;
        ids.forEach((problemId) => {
            const index = data.findIndex(searchById(problemId));
            if (index > -1) {
                data.splice(index, 1);
            }
            else {
                logger.error(`Remove problems failed, because there is no problem found via ${problemId}`);
            }
        });
        this.setState({
            data: [...data],
        }, () => {
            this.updateStatusBar();
        });
    }
    reset() {
        const { builtInStatusProblems } = this.builtinService.getModules();
        this.setState(Object.assign(Object.assign({}, this.state), { data: [] }));
        if (builtInStatusProblems) {
            this.updateStatus(builtInStatusProblems);
        }
    }
    onSelect(callback) {
        this.subscribe(ProblemsEvent.onSelect, callback);
    }
    updateStatusBar() {
        const { data = [] } = this.state;
        const markersData = this.getProblemsMarkers(data);
        const { builtInStatusProblems } = this.builtinService.getModules();
        if (builtInStatusProblems) {
            this.updateStatus(Object.assign(builtInStatusProblems, {
                data: markersData,
            }));
        }
    }
    updateStatus(item) {
        this.statusBarService.update(item);
    }
};
ProblemsService = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], ProblemsService);
export { ProblemsService };
