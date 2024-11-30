var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { SuperComponent, wxComponent } from '../common/src/index';
import ImageProps from './props';
import config from '../common/config';
import { addUnit, getRect } from '../common/utils';
const { prefix } = config;
const name = `${prefix}-image`;
let Image = class Image extends SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [`${prefix}-class`, `${prefix}-class-load`];
        this.options = {
            multipleSlots: true,
        };
        this.properties = ImageProps;
        this.data = {
            prefix,
            isLoading: true,
            isFailed: false,
            innerStyle: '',
            classPrefix: name,
        };
        this.preSrc = '';
        this.observers = {
            src() {
                if (this.preSrc === this.properties.src)
                    return;
                this.update();
            },
            'width, height'(width, height) {
                this.calcSize(width, height);
            },
        };
        this.methods = {
            onLoaded(e) {
                const sdkVersion = wx.getSystemInfoSync().SDKVersion;
                const versionArray = sdkVersion.split('.').map((v) => parseInt(v, 10));
                const { mode } = this.properties;
                const isInCompatible = versionArray[0] < 2 ||
                    (versionArray[0] === 2 && versionArray[1] < 10) ||
                    (versionArray[0] === 2 && versionArray[1] === 10 && versionArray[2] < 3);
                if (mode === 'heightFix' && isInCompatible) {
                    const { height: picHeight, width: picWidth } = e.detail;
                    getRect(this, '#image').then((rect) => {
                        const { height } = rect;
                        const resultWidth = ((height / picHeight) * picWidth).toFixed(2);
                        this.setData({ innerStyle: `height: ${addUnit(height)}; width: ${resultWidth}px;` });
                    });
                }
                this.setData({
                    isLoading: false,
                    isFailed: false,
                });
                this.triggerEvent('load', e.detail);
            },
            onLoadError(e) {
                this.setData({
                    isLoading: false,
                    isFailed: true,
                });
                this.triggerEvent('error', e.detail);
            },
            calcSize(width, height) {
                let innerStyle = '';
                if (width) {
                    innerStyle += `width: ${addUnit(width)};`;
                }
                if (height) {
                    innerStyle += `height: ${addUnit(height)};`;
                }
                this.setData({
                    innerStyle,
                });
            },
            update() {
                const { src } = this.properties;
                this.preSrc = src;
                if (!src) {
                    this.onLoadError({ errMsg: '图片链接为空' });
                }
                else {
                    this.setData({
                        isLoading: true,
                        isFailed: false,
                    });
                }
            },
        };
    }
};
Image = __decorate([
    wxComponent()
], Image);
export default Image;
