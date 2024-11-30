export interface TdMessageProps {
    action?: {
        type: StringConstructor;
        value?: string;
    };
    align?: {
        type: StringConstructor;
        value?: MessageAlignType;
    };
    closeBtn?: {
        type: null;
        value?: string | boolean;
    };
    content?: {
        type: StringConstructor;
        value?: string;
    };
    style?: {
        type: StringConstructor;
        value?: string;
    };
    duration?: {
        type: NumberConstructor;
        value?: number;
    };
    externalClasses?: {
        type: ArrayConstructor;
        value?: ['t-class', 't-class-content', 't-class-icon', 't-class-action', 't-class-close-btn'];
    };
    icon?: {
        type: null;
        value?: boolean | 'info' | 'bell';
    };
    marquee?: {
        type: null;
        value?: boolean | DrawMarquee;
    };
    offset?: {
        type: ArrayConstructor;
        value?: Array<string | number>;
    };
    theme?: {
        type: StringConstructor;
        value?: MessageThemeList;
    };
    visible?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    defaultVisible?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    zIndex?: {
        type: NumberConstructor;
        value?: number;
    };
    link?: {
        type: null;
        value?: string | object;
    };
}
export declare type MessageAlignType = 'left' | 'center';
export interface DrawMarquee {
    speed?: number;
    loop?: number;
    delay?: number;
}
export declare type MessageThemeList = 'info' | 'success' | 'warning' | 'error';
