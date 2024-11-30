export interface TdNoticeBarProps {
    content?: {
        type: null;
        value?: null;
    };
    style?: {
        type: StringConstructor;
        value?: string;
    };
    direction?: {
        type: StringConstructor;
        value?: 'horizontal' | 'vertical';
    };
    externalClasses?: {
        type: ArrayConstructor;
        value?: ['t-class', 't-class-content', 't-class-prefix-icon', 't-class-operation', 't-class-suffix-icon'];
    };
    operation?: {
        type: StringConstructor;
        value?: string;
    };
    interval: {
        type: NumberConstructor;
        value: number;
    };
    marquee?: {
        type: null;
        value?: boolean | DrawMarquee;
    };
    prefixIcon?: {
        type: null;
        value?: boolean | string | object;
    };
    suffixIcon?: {
        type: null;
        value?: string | object;
    };
    theme?: {
        type: StringConstructor;
        value?: 'info' | 'success' | 'warning' | 'error';
    };
    visible?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    defaultVisible?: {
        type: BooleanConstructor;
        value?: boolean;
    };
}
export declare type NoticeBarTrigger = 'prefix-icon' | 'content' | 'operation' | 'suffix-icon';
export interface DrawMarquee {
    speed?: number;
    loop?: number;
    delay?: number;
}
