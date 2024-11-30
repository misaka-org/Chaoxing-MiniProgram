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
const name = `${prefix}-picker-item`;
const itemHeight = 80;
const DefaultDuration = 240;
const { windowWidth } = wx.getSystemInfoSync();
const rpx2px = (rpx) => Math.floor((windowWidth * rpx) / 750);
const range = function (num, min, max) {
    return Math.min(Math.max(num, min), max);
};
let PickerItem = class PickerItem extends SuperComponent {
    constructor() {
        super(...arguments);
        this.relations = {
            '../picker/picker': {
                type: 'parent',
                linked(parent) {
                    if ('keys' in parent.data) {
                        const { keys } = parent.data;
                        this.setData({
                            labelAlias: (keys === null || keys === void 0 ? void 0 : keys.label) || 'label',
                            valueAlias: (keys === null || keys === void 0 ? void 0 : keys.value) || 'value',
                        });
                    }
                },
            },
        };
        this.externalClasses = [`${prefix}-class`];
        this.properties = props;
        this.observers = {
            options() {
                this.update();
            },
        };
        this.data = {
            prefix,
            classPrefix: name,
            offset: 0,
            duration: 0,
            value: '',
            curIndex: 0,
            columnIndex: 0,
            labelAlias: 'label',
            valueAlias: 'value',
        };
        this.methods = {
            onTouchStart(event) {
                this.StartY = event.touches[0].clientY;
                this.StartOffset = this.data.offset;
                this.setData({ duration: 0 });
            },
            onTouchMove(event) {
                const { StartY, StartOffset, itemHeight } = this;
                const touchDeltaY = event.touches[0].clientY - StartY;
                const deltaY = this.calculateViewDeltaY(touchDeltaY);
                this.setData({
                    offset: range(StartOffset + deltaY, -(this.getCount() * itemHeight), 0),
                    duration: DefaultDuration,
                });
            },
            onTouchEnd() {
                const { offset, labelAlias, valueAlias, columnIndex } = this.data;
                const { options } = this.properties;
                if (offset === this.StartOffset) {
                    return;
                }
                const index = range(Math.round(-offset / this.itemHeight), 0, this.getCount() - 1);
                this.setData({
                    curIndex: index,
                    offset: -index * this.itemHeight,
                });
                if (index === this._selectedIndex) {
                    return;
                }
                wx.nextTick(() => {
                    var _a, _b, _c;
                    this._selectedIndex = index;
                    this._selectedValue = (_a = options[index]) === null || _a === void 0 ? void 0 : _a[valueAlias];
                    this._selectedLabel = (_b = options[index]) === null || _b === void 0 ? void 0 : _b[labelAlias];
                    (_c = this.$parent) === null || _c === void 0 ? void 0 : _c.triggerColumnChange({
                        index,
                        column: columnIndex,
                    });
                });
            },
            update() {
                var _a, _b;
                const { options, value, labelAlias, valueAlias } = this.data;
                const index = options.findIndex((item) => item[valueAlias] === value);
                const selectedIndex = index > 0 ? index : 0;
                this.setData({
                    offset: -selectedIndex * this.itemHeight,
                    curIndex: selectedIndex,
                });
                this._selectedIndex = selectedIndex;
                this._selectedValue = (_a = options[selectedIndex]) === null || _a === void 0 ? void 0 : _a[valueAlias];
                this._selectedLabel = (_b = options[selectedIndex]) === null || _b === void 0 ? void 0 : _b[labelAlias];
            },
            resetOrigin() {
                this.update();
            },
            getCount() {
                var _a, _b;
                return (_b = (_a = this.data) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.length;
            },
        };
    }
    calculateViewDeltaY(touchDeltaY) {
        return Math.abs(touchDeltaY) > itemHeight ? 1.2 * touchDeltaY : touchDeltaY;
    }
    created() {
        this.StartY = 0;
        this.StartOffset = 0;
        this.itemHeight = rpx2px(itemHeight);
    }
};
PickerItem = __decorate([
    wxComponent()
], PickerItem);
export default PickerItem;
