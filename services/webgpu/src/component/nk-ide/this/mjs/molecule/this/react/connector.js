import 'reflect-metadata';
import { container } from 'tsyringe';
import React, { Component } from 'react';
import Logger from './../../this/common/logger';
export function connect(Service, View, Controller) {
    return class Connector extends Component {
        constructor(props) {
            super(props);
            this._isMounted = false;
            this.update = () => {
                if (this._isMounted) {
                    this.setState({
                        lastUpdated: Date.now(),
                    });
                }
            };
            this.onChange = this.onChange.bind(this);
            this.state = {
                lastUpdated: Date.now(),
            };
        }
        componentDidMount() {
            this._isMounted = true;
            this.handleService((service) => {
                service.onUpdateState(this.onChange);
            });
        }
        componentWillUnmount() {
            this._isMounted = false;
            this.handleService((service) => {
                service.removeOnUpdateState(this.onChange);
            });
        }
        onChange(prevState, nextState) {
            Logger.info(prevState, nextState, container._registry);
            this.update();
        }
        getServiceState() {
            const target = {};
            this.handleService((service, prop) => {
                if (prop) {
                    Object.assign(target, {
                        [prop]: Object.assign({}, service.getState()),
                    });
                }
                else {
                    Object.assign(target, Object.assign({}, service.getState()));
                }
            });
            return target;
        }
        handleService(callback) {
            if (this.isValidService(Service)) {
                callback(Service);
            }
            else {
                for (const name in Service) {
                    if (name) {
                        const service = Service[name];
                        if (this.isValidService(service)) {
                            callback(service, name);
                        }
                    }
                }
            }
        }
        getControllerProperties() {
            const target = {};
            if (!Controller) {
                return target;
            }
            this.handleController((controller, prop) => {
                if (prop) {
                    Object.assign(target, {
                        [prop]: this.getObjectPublicProperties(controller),
                    });
                }
                else {
                    Object.assign(target, this.getObjectPublicProperties(controller));
                }
            });
            return target;
        }
        handleController(callback) {
            if (this.isValidController(Controller)) {
                callback(Controller);
            }
            else {
                for (const name in Controller) {
                    if (name) {
                        const controller = Controller[name];
                        if (this.isValidController(controller)) {
                            callback(controller, name);
                        }
                    }
                }
            }
        }
        render() {
            return (React.createElement(View, Object.assign({}, this.state, this.props, this.getServiceState(), this.getControllerProperties())));
        }
        isValidService(service) {
            return typeof service.onUpdateState === 'function';
        }
        isValidController(controller) {
            return typeof controller.initView === 'function';
        }
        getObjectPublicProperties(obj) {
            const keys = Object.keys(obj);
            const result = {};
            keys.forEach((key) => {
                // Filter the Service, Controller instances and private properties which start with '_'
                // TODO There need a better way to filter the private properties of Object,
                // maybe we can make use of the # identifier in future.
                if (!key.endsWith('Service') &&
                    !key.endsWith('Controller') &&
                    !key.startsWith('_')) {
                    result[key] = obj[key];
                }
            });
            return result;
        }
    };
}
