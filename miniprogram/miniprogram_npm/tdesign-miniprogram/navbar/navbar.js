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
const name = `${prefix}-navbar`;
let Navbar = class Navbar extends SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [
            `${prefix}-class`,
            `${prefix}-class-title`,
            `${prefix}-class-left`,
            `${prefix}-class-center`,
            `${prefix}-class-left-icon`,
            `${prefix}-class-home-icon`,
            `${prefix}-class-capsule`,
            `${prefix}-class-nav-btn`,
        ];
        this.timer = null;
        this.options = {
            addGlobalClass: true,
            multipleSlots: true,
        };
        this.properties = props;
        this.observers = {
            visible(visible) {
                const { animation } = this.properties;
                const visibleClass = `${name}${visible ? '--visible' : '--hide'}`;
                this.setData({
                    visibleClass: `${visibleClass}${animation ? '-animation' : ''}`,
                });
                if (this.timer) {
                    clearTimeout(this.timer);
                }
                if (animation) {
                    this.timer = setTimeout(() => {
                        this.setData({
                            visibleClass,
                        });
                    }, 300);
                }
            },
            'title,titleMaxLength'() {
                const { title } = this.properties;
                const titleMaxLength = this.properties.titleMaxLength || Number.MAX_SAFE_INTEGER;
                let temp = title.slice(0, titleMaxLength);
                if (titleMaxLength < title.length)
                    temp += '...';
                this.setData({
                    showTitle: temp,
                });
            },
        };
        this.data = {
            prefix,
            classPrefix: name,
            boxStyle: '',
            showTitle: '',
        };
        this.methods = {
            goBack() {
                const { delta } = this.data;
                const that = this;
                this.triggerEvent('go-back');
                if (delta > 0) {
                    wx.navigateBack({
                        delta,
                        fail(e) {
                            that.triggerEvent('fail', e);
                        },
                        complete(e) {
                            that.triggerEvent('complete', e);
                        },
                        success(e) {
                            that.triggerEvent('success', e);
                        },
                    });
                }
            },
        };
    }
    attached() {
        let rect = null;
        if (wx.getMenuButtonBoundingClientRect) {
            rect = wx.getMenuButtonBoundingClientRect();
        }
        if (!rect)
            return;
        wx.getSystemInfo({
            success: (res) => {
                const boxStyleList = [];
                const { windowWidth, statusBarHeight } = wx.getSystemInfoSync();
                const px2rpx = (v) => Math.round((v * 750) / (windowWidth >= 750 ? 750 / 2 : windowWidth));
                boxStyleList.push(`--td-navbar-padding-top: ${px2rpx(statusBarHeight)}rpx`);
                if (rect && (res === null || res === void 0 ? void 0 : res.windowWidth)) {
                    boxStyleList.push(`--td-navbar-right: ${px2rpx(res.windowWidth - rect.left)}rpx`);
                }
                boxStyleList.push(`--td-navbar-capsule-height: ${px2rpx(rect.height)}rpx`);
                boxStyleList.push(`--td-navbar-capsule-width: ${px2rpx(rect.width)}rpx`);
                boxStyleList.push(`--td-navbar-height: ${px2rpx((rect.top - statusBarHeight) * 2 + rect.height)}rpx`);
                this.setData({
                    boxStyle: `${boxStyleList.join('; ')}`,
                });
            },
            fail: (err) => {
                console.error('navbar 获取系统信息失败', err);
            },
        });
    }
};
Navbar = __decorate([
    wxComponent()
], Navbar);
export default Navbar;
