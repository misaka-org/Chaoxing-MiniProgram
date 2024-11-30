var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
import { styles, addUnit } from '../common/utils';
const { prefix } = config;
const name = `${prefix}-icon`;
let Icon = class Icon extends SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [`${prefix}-class`];
        this.properties = props;
        this.data = {
            componentPrefix: prefix,
            classPrefix: name,
            isImage: false,
            iconStyle: undefined,
        };
        this.observers = {
            'name, color, size, style'() {
                this.setIconStyle();
            },
        };
        this.methods = {
            onTap(event) {
                this.triggerEvent('click', event.detail);
            },
            setIconStyle() {
                const { name, color, size } = this.properties;
                const isImage = name.indexOf('/') !== -1;
                const sizeValue = addUnit(size);
                const sizeStyle = isImage ? { width: sizeValue, height: sizeValue } : {};
                const colorStyle = color ? { color: color } : {};
                const fontStyle = size ? { 'font-size': sizeValue } : {};
                this.setData({
                    isImage,
                    iconStyle: `${styles(Object.assign(Object.assign(Object.assign({}, colorStyle), fontStyle), sizeStyle))}`,
                });
            },
        };
    }
};
Icon = __decorate([
    wxComponent()
], Icon);
export default Icon;
