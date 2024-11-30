import { LoadingProps } from '../loading/index';
export interface TdPullDownRefreshProps {
    enableBackToTop?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    enablePassive?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    externalClasses?: {
        type: ArrayConstructor;
        value?: ['t-class', 't-class-loading', 't-class-text', 't-class-indicator'];
    };
    loadingBarHeight?: {
        type: null;
        value?: string | number;
    };
    loadingProps?: {
        type: ObjectConstructor;
        value?: LoadingProps;
    };
    loadingTexts?: {
        type: ArrayConstructor;
        value?: string[];
    };
    lowerThreshold?: {
        type: null;
        value?: string | number;
    };
    maxBarHeight?: {
        type: null;
        value?: string | number;
    };
    refreshTimeout?: {
        type: NumberConstructor;
        value?: number;
    };
    scrollIntoView?: {
        type: StringConstructor;
        value?: string;
    };
    showScrollbar?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    upperThreshold?: {
        type: null;
        value?: string | number;
    };
    value?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    defaultValue?: {
        type: BooleanConstructor;
        value?: boolean;
    };
}
