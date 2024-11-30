export interface TdStickyProps {
    container?: {
        type: undefined;
        value?: null;
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
        value?: ['t-class'];
    };
    offsetTop?: {
        type: NumberConstructor;
        value?: number;
    };
    zIndex?: {
        type: NumberConstructor;
        value?: number;
    };
}
