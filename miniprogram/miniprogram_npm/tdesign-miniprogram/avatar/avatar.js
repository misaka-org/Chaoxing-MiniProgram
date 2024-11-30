var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import avatarProps from './props';
import { setIcon } from '../common/utils';
const { prefix } = config;
const name = `${prefix}-avatar`;
let Avatar = class Avatar extends SuperComponent {
    constructor() {
        super(...arguments);
        this.options = {
            multipleSlots: true,
            styleIsolation: 'apply-shared',
        };
        this.externalClasses = [
            `${prefix}-class`,
            `${prefix}-class-image`,
            `${prefix}-class-icon`,
            `${prefix}-class-alt`,
            `${prefix}-class-content`,
        ];
        this.properties = avatarProps;
        this.data = {
            prefix,
            classPrefix: name,
            isShow: true,
            zIndex: 0,
            borderedWithGroup: false,
        };
        this.relations = {
            '../avatar-group/avatar-group': {
                type: 'ancestor',
                linked(parent) {
                    var _a;
                    this.parent = parent;
                    this.setData({
                        size: (_a = this.data.size) !== null && _a !== void 0 ? _a : parent.data.size,
                        borderedWithGroup: true,
                    });
                },
            },
        };
        this.observers = {
            icon(icon) {
                const obj = setIcon('icon', icon, '');
                this.setData(Object.assign({}, obj));
            },
        };
        this.methods = {
            hide() {
                this.setData({
                    isShow: false,
                });
            },
            updateCascading(zIndex) {
                this.setData({ zIndex });
            },
            onLoadError(e) {
                if (this.properties.hideOnLoadFailed) {
                    this.setData({
                        isShow: false,
                    });
                }
                this.triggerEvent('error', e.detail);
            },
        };
    }
};
Avatar = __decorate([
    wxComponent()
], Avatar);
export default Avatar;
