var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
const { prefix } = config;
const name = `${prefix}-tree-select`;
let TreeSelect = class TreeSelect extends SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [`${prefix}-class`];
        this.options = {
            multipleSlots: true,
        };
        this.data = {
            prefix,
            classPrefix: name,
        };
        this.properties = props;
        this.controlledProps = [
            {
                key: 'value',
                event: 'change',
            },
        ];
        this.observers = {
            'value, options, keys, multiple'() {
                this.buildTreeOptions();
            },
        };
        this.methods = {
            buildTreeOptions() {
                const { options, value, multiple, keys } = this.data;
                const treeOptions = [];
                let level = -1;
                let node = { children: options };
                if (options.length === 0 || (Array.isArray(value) && value.length === 0))
                    return;
                while (node && node.children) {
                    level += 1;
                    const list = node.children.map((item) => ({
                        label: item[(keys === null || keys === void 0 ? void 0 : keys.label) || 'label'],
                        value: item[(keys === null || keys === void 0 ? void 0 : keys.value) || 'value'],
                        children: item.children,
                    }));
                    const thisValue = value === null || value === void 0 ? void 0 : value[level];
                    treeOptions.push([...list]);
                    if (thisValue == null) {
                        const [firstChild] = list;
                        node = firstChild;
                    }
                    else {
                        const child = list.find((child) => child.value === thisValue);
                        node = child !== null && child !== void 0 ? child : list[0];
                    }
                }
                const leafLevel = Math.max(0, level);
                if (multiple) {
                    const finalValue = this.data.value || this.data.defaultValue;
                    if (finalValue[leafLevel] != null && !Array.isArray(finalValue[leafLevel])) {
                        throw TypeError('应传入数组类型的 value');
                    }
                }
                this.setData({
                    leafLevel,
                    treeOptions,
                });
            },
            onRootChange(e) {
                const { value } = this.data;
                const { value: itemValue } = e.detail;
                value[0] = itemValue;
                this._trigger('change', { value, level: 0 });
            },
            handleTreeClick(e) {
                const { level, value: itemValue } = e.currentTarget.dataset;
                const { value } = this.data;
                value[level] = itemValue;
                this._trigger('change', { value, level: 1 });
            },
            handleRadioChange(e) {
                const { value } = this.data;
                const { value: itemValue } = e.detail;
                const { level } = e.target.dataset;
                value[level] = itemValue;
                this._trigger('change', { value, level });
            },
        };
    }
};
TreeSelect = __decorate([
    wxComponent()
], TreeSelect);
export default TreeSelect;
