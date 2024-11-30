var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
import { unitConvert } from '../common/utils';
const { prefix } = config;
const name = `${prefix}-pull-down-refresh`;
let PullDownRefresh = class PullDownRefresh extends SuperComponent {
    constructor() {
        super(...arguments);
        this.pixelRatio = 1;
        this.startPoint = null;
        this.isPulling = false;
        this.loadingBarHeight = 100;
        this.maxRefreshAnimateTimeFlag = 0;
        this.closingAnimateTimeFlag = 0;
        this.externalClasses = [`${prefix}-class`, `${prefix}-class-loading`, `${prefix}-class-text`, `${prefix}-class-indicator`];
        this.options = {
            multipleSlots: true,
        };
        this.relations = {
            '../back-top/back-top': {
                type: 'descendant',
            },
        };
        this.properties = props;
        this.data = {
            prefix,
            classPrefix: name,
            barHeight: 0,
            refreshStatus: -1,
            loosing: false,
            enableToRefresh: true,
            scrollTop: 0,
        };
        this.lifetimes = {
            attached() {
                const { screenWidth } = wx.getSystemInfoSync();
                const { loadingBarHeight, loadingTexts } = this.properties;
                this.setData({
                    loadingTexts: Array.isArray(loadingTexts) && loadingTexts.length >= 4
                        ? loadingTexts
                        : ['下拉刷新', '松手刷新', '正在刷新', '刷新完成'],
                });
                this.pixelRatio = 750 / screenWidth;
                Object.defineProperty(this, 'maxBarHeight', {
                    get() {
                        return unitConvert(this.data.maxBarHeight);
                    },
                });
                Object.defineProperty(this, 'loadingBarHeight', {
                    get() {
                        return unitConvert(this.data.loadingBarHeight);
                    },
                });
                if (loadingBarHeight) {
                    this.setData({
                        computedLoadingBarHeight: unitConvert(loadingBarHeight),
                    });
                }
            },
            detached() {
                clearTimeout(this.maxRefreshAnimateTimeFlag);
                clearTimeout(this.closingAnimateTimeFlag);
            },
        };
        this.observers = {
            value(val) {
                if (!val) {
                    clearTimeout(this.maxRefreshAnimateTimeFlag);
                    if (this.data.refreshStatus > 0) {
                        this.setData({
                            refreshStatus: 3,
                        });
                    }
                    this.setData({ barHeight: 0 });
                }
                else {
                    this.doRefresh();
                }
            },
        };
        this.methods = {
            onScrollToBottom() {
                this.triggerEvent('scrolltolower');
            },
            onScrollToTop() {
                this.setData({
                    enableToRefresh: true,
                });
            },
            onScroll(e) {
                const { scrollTop } = e.detail;
                this.setData({
                    enableToRefresh: scrollTop === 0,
                });
                this.triggerEvent('scroll', { scrollTop });
            },
            onTouchStart(e) {
                if (this.isPulling || !this.data.enableToRefresh)
                    return;
                const { touches } = e;
                if (touches.length !== 1)
                    return;
                const { pageX, pageY } = touches[0];
                this.setData({ loosing: false });
                this.startPoint = { pageX, pageY };
                this.isPulling = true;
            },
            onTouchMove(e) {
                if (!this.startPoint)
                    return;
                const { touches } = e;
                if (touches.length !== 1)
                    return;
                const { pageY } = touches[0];
                const offset = pageY - this.startPoint.pageY;
                if (offset > 0) {
                    this.setRefreshBarHeight(offset);
                }
            },
            onTouchEnd(e) {
                if (!this.startPoint)
                    return;
                const { changedTouches } = e;
                if (changedTouches.length !== 1)
                    return;
                const { pageY } = changedTouches[0];
                const barHeight = pageY - this.startPoint.pageY;
                this.startPoint = null;
                this.isPulling = false;
                this.setData({ loosing: true });
                if (barHeight > this.loadingBarHeight) {
                    this._trigger('change', { value: true });
                    this.triggerEvent('refresh');
                }
                else {
                    this.setData({ barHeight: 0 });
                }
            },
            doRefresh() {
                this.setData({
                    barHeight: this.loadingBarHeight,
                    refreshStatus: 2,
                    loosing: true,
                });
                this.maxRefreshAnimateTimeFlag = setTimeout(() => {
                    this.maxRefreshAnimateTimeFlag = null;
                    if (this.data.refreshStatus === 2) {
                        this.triggerEvent('timeout');
                        this._trigger('change', { value: false });
                    }
                }, this.properties.refreshTimeout);
            },
            setRefreshBarHeight(value) {
                const barHeight = Math.min(value, this.maxBarHeight);
                const data = { barHeight };
                if (barHeight >= this.loadingBarHeight) {
                    data.refreshStatus = 1;
                }
                else {
                    data.refreshStatus = 0;
                }
                return new Promise((resolve) => {
                    this.setData(data, () => resolve(barHeight));
                });
            },
            setScrollTop(scrollTop) {
                this.setData({ scrollTop });
            },
            scrollToTop() {
                this.setScrollTop(0);
            },
        };
    }
};
PullDownRefresh = __decorate([
    wxComponent()
], PullDownRefresh);
export default PullDownRefresh;
