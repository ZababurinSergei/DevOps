var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import { Children, PureComponent, isValidElement, } from 'react';
import { prefixClaName, classNames, getBEMElement, getBEMModifier, } from './../../../this/common/className';
import { cloneReactChildren } from './../../../this/react';
import { getAttr } from './../../../this/common/dom';
import { useContextView } from './../../../this/components/contextView';
import { Icon } from '../icon';
const initialValue = {
    isOpen: false,
    option: {
        name: '',
        value: '',
        description: '',
    },
};
export const selectClassName = prefixClaName('select');
const containerClassName = getBEMElement(selectClassName, 'container');
const selectOptionsClassName = getBEMElement(selectClassName, 'options');
const selectDescriptorClassName = getBEMElement(selectClassName, 'descriptor');
export const inputClassName = getBEMElement(selectClassName, 'input');
const selectActiveClassName = getBEMModifier(selectClassName, 'active');
const selectArrowClassName = getBEMElement(selectClassName, 'arrow');
export class Select extends PureComponent {
    constructor(props) {
        super(props);
        this.handleOnClickOption = (e) => {
            const option = e.target;
            const value = getAttr(option, 'data-value');
            const name = getAttr(option, 'data-name');
            const desc = getAttr(option, 'data-desc');
            if (name) {
                const optionItem = {
                    value: value,
                    name: name,
                    description: desc,
                };
                this.setState({
                    option: optionItem,
                }, () => {
                    var _a, _b;
                    (_b = (_a = this.props).onSelect) === null || _b === void 0 ? void 0 : _b.call(_a, e, optionItem);
                    this.contextView.hide();
                });
            }
        };
        this.handleOnHoverOption = (e) => {
            const option = e.target;
            const desc = getAttr(option, 'data-desc');
            const descriptor = this.contextView.view.querySelector('.' + selectDescriptorClassName);
            if (descriptor) {
                const content = desc || 'None';
                descriptor.innerHTML = content;
                descriptor.setAttribute('title', content);
            }
        };
        this.handleOnClickSelect = (e) => {
            const select = this.selectElm.current;
            const { children } = this.props;
            if (select) {
                const selectRect = select === null || select === void 0 ? void 0 : select.getBoundingClientRect();
                selectRect.y = selectRect.y + selectRect.height;
                this.setState({ isOpen: true });
                this.contextView.show(selectRect, () => {
                    return (React.createElement("div", { style: {
                            width: selectRect.width,
                        }, className: classNames(containerClassName, selectActiveClassName), onMouseOver: this.handleOnHoverOption },
                        React.createElement("div", { className: selectOptionsClassName }, cloneReactChildren(children, {
                            onClick: this.handleOnClickOption,
                        })),
                        React.createElement("div", { className: selectDescriptorClassName }, "None")));
                });
            }
        };
        this.contextView = useContextView({
            shadowOutline: false,
        });
        this.state = this.getDefaultState(this.props);
        this.selectElm = React.createRef();
        this.selectInput = React.createRef();
    }
    static getDerivedStateFromProps(props, state) {
        if (props.value !== state.value) {
            return {
                option: Select.getSelectOption(props),
            };
        }
        return null;
    }
    componentDidMount() {
        this.contextView.onHide(() => {
            if (this.state.isOpen) {
                this.setState({
                    isOpen: false,
                });
            }
        });
    }
    componentWillUnmount() {
        this.contextView.dispose();
    }
    static getSelectOption(props) {
        let defaultSelectedOption = {};
        const defaultValue = props.value || props.defaultValue;
        const options = Children.toArray(props.children);
        for (const option of options) {
            if (isValidElement(option)) {
                const optionProps = option.props;
                if (optionProps.value && optionProps.value === defaultValue) {
                    defaultSelectedOption = Object.assign(Object.assign({}, optionProps), { name: optionProps.name ||
                            optionProps.children });
                    break;
                }
            }
        }
        return defaultSelectedOption;
    }
    getDefaultState(props) {
        return Object.assign(Object.assign({}, initialValue), { option: Object.assign({}, Select.getSelectOption(props)) });
    }
    render() {
        const { option, isOpen } = this.state;
        const _a = this.props, { className, placeholder, onSelect } = _a, restProps = __rest(_a, ["className", "placeholder", "onSelect"]);
        const selectActive = isOpen ? selectActiveClassName : '';
        const claNames = classNames(selectClassName, className, selectActive);
        return (React.createElement("div", Object.assign({ ref: this.selectElm, className: claNames }, restProps),
            React.createElement("input", { onClick: this.handleOnClickSelect, ref: this.selectInput, autoComplete: "off", placeholder: placeholder, className: inputClassName, value: option.name, readOnly: true }),
            React.createElement("span", { className: selectArrowClassName },
                React.createElement(Icon, { type: 'chevron-down' }))));
    }
}
