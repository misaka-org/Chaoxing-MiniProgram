export interface TdRateProps {
    allowHalf?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    color?: {
        type: null;
        value?: string | Array<string>;
    };
    count?: {
        type: NumberConstructor;
        value?: number;
    };
    style?: {
        type: StringConstructor;
        value?: string;
    };
    disabled?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    externalClasses?: {
        type: ArrayConstructor;
        value?: ['t-class', 't-class-icon', 't-class-text'];
    };
    gap?: {
        type: null;
        value?: string | number;
    };
    iconPrefix?: {
        type: StringConstructor;
        value?: string;
        reuqired?: boolean;
    };
    icon?: {
        type: null;
        value?: string | string[];
    };
    showText?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    size?: {
        type: StringConstructor;
        value?: string;
    };
    texts?: {
        type: ArrayConstructor;
        value?: Array<string>;
    };
    value?: {
        type: NumberConstructor;
        value?: number;
    };
    defaultValue?: {
        type: NumberConstructor;
        value?: number;
    };
    placement?: {
        type: StringConstructor;
        value?: 'top' | 'bottom';
    };
}
