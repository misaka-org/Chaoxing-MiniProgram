var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
import { getBackgroundColor } from './utils';
import { unitConvert, getRect } from '../common/utils';
const { prefix } = config;
const name = `${prefix}-progress`;
let Progress = class Progress extends SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [`${prefix}-class`, `${prefix}-class-bar`, `${prefix}-class-label`];
        this.options = {
            multipleSlots: true,
        };
        this.properties = props;
        this.data = {
            prefix,
            classPrefix: name,
            colorBar: '',
            heightBar: '',
            computedStatus: '',
            computedProgress: 0,
            isIOS: false,
        };
        this.observers = {
            percentage(percentage) {
                percentage = Math.max(0, Math.min(percentage, 100));
                this.setData({
                    computedStatus: percentage === 100 ? 'success' : '',
                    computedProgress: percentage,
                });
            },
            color(color) {
                this.setData({
                    colorBar: getBackgroundColor(color),
                    colorCircle: typeof color === 'object' ? '' : color,
                });
            },
            strokeWidth(strokeWidth) {
                if (!strokeWidth) {
                    return '';
                }
                this.setData({
                    heightBar: unitConvert(strokeWidth),
                });
            },
            theme(theme) {
                if (theme === 'circle') {
                    this.getInnerDiameter();
                }
            },
            trackColor(trackColor) {
                this.setData({
                    bgColorBar: trackColor,
                });
            },
        };
        this.methods = {
            getInnerDiameter() {
                const { strokeWidth } = this.properties;
                const wrapID = `.${name}__canvas--circle`;
                if (strokeWidth) {
                    getRect(this, wrapID).then((wrapRect) => {
                        this.setData({
                            innerDiameter: wrapRect.width - unitConvert(strokeWidth) * 2,
                        });
                    });
                }
            },
        };
    }
    attached() {
        wx.getSystemInfo({
            success: (res) => {
                const isIOS = !!(res.system.toLowerCase().search('ios') + 1);
                this.setData({
                    isIOS,
                });
            },
            fail: (err) => {
                console.error('progress 获取系统信息失败', err);
            },
        });
    }
};
Progress = __decorate([
    wxComponent()
], Progress);
export default Progress;
