import { SuperComponent, RelationsOptions } from '../common/src/index';
export default class PullDownRefresh extends SuperComponent {
    pixelRatio: number;
    startPoint: {
        pageX: number;
        pageY: number;
    } | null;
    isPulling: boolean;
    loadingBarHeight: number;
    maxRefreshAnimateTimeFlag: number;
    closingAnimateTimeFlag: number;
    externalClasses: string[];
    options: {
        multipleSlots: boolean;
    };
    relations: RelationsOptions;
    properties: import("./type").TdPullDownRefreshProps;
    data: {
        prefix: string;
        classPrefix: string;
        barHeight: number;
        refreshStatus: number;
        loosing: boolean;
        enableToRefresh: boolean;
        scrollTop: number;
    };
    lifetimes: {
        attached(): void;
        detached(): void;
    };
    observers: {
        value(val: any): void;
    };
    methods: {
        onScrollToBottom(): void;
        onScrollToTop(): void;
        onScroll(e: any): void;
        onTouchStart(e: WechatMiniprogram.Component.TrivialInstance): void;
        onTouchMove(e: WechatMiniprogram.Component.TrivialInstance): void;
        onTouchEnd(e: WechatMiniprogram.Component.TrivialInstance): void;
        doRefresh(): void;
        setRefreshBarHeight(value: number): Promise<unknown>;
        setScrollTop(scrollTop: number): void;
        scrollToTop(): void;
    };
}
