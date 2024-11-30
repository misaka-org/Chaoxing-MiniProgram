var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
const systemInfo = wx.getSystemInfoSync();
const { prefix } = config;
const name = `${prefix}-fab`;
const baseButtonProps = {
    size: 'large',
    shape: 'circle',
    theme: 'primary',
    externalClass: `${prefix}-fab__button`,
};
let Fab = class Fab extends SuperComponent {
    constructor() {
        super(...arguments);
        this.properties = props;
        this.externalClasses = [`class`, `${prefix}-class`, `${prefix}-class-button`];
        this.data = {
            prefix,
            classPrefix: name,
            buttonData: baseButtonProps,
            moveStyle: null,
        };
        this.observers = {
            'buttonProps.**, icon, text, ariaLabel'() {
                this.setData({
                    buttonData: Object.assign(Object.assign(Object.assign(Object.assign({}, baseButtonProps), { shape: this.properties.text ? 'round' : 'circle', icon: this.properties.icon }), this.properties.buttonProps), { content: this.properties.text, ariaLabel: this.properties.ariaLabel }),
                }, this.computedSize);
            },
        };
        this.methods = {
            onTplButtonTap(e) {
                this.triggerEvent('click', e);
            },
            onMove(e) {
                const { x, y, rect } = e.detail;
                const maxX = systemInfo.windowWidth - rect.width;
                const maxY = systemInfo.windowHeight - rect.height;
                const right = Math.max(0, Math.min(x, maxX));
                const bottom = Math.max(0, Math.min(y, maxY));
                this.setData({
                    moveStyle: `right: ${right}px; bottom: ${bottom}px;`,
                });
            },
            computedSize() {
                if (!this.properties.draggable)
                    return;
                const insChild = this.selectComponent('#draggable');
                insChild.computedRect();
            },
        };
    }
};
Fab = __decorate([
    wxComponent()
], Fab);
export default Fab;
