export interface TdToastProps {
    style?: {
        type: StringConstructor;
        value?: string;
    };
    direction?: {
        type: StringConstructor;
        value?: 'row' | 'column';
    };
    duration?: {
        type: NumberConstructor;
        value?: number;
    };
    externalClasses?: {
        type: ArrayConstructor;
        value?: ['t-class'];
    };
    icon?: {
        type: null;
        value?: string;
    };
    message?: {
        type: StringConstructor;
        value?: string;
    };
    overlayProps?: {
        type: ObjectConstructor;
        value?: object;
    };
    placement?: {
        type: StringConstructor;
        value?: 'top' | 'middle' | 'bottom';
    };
    preventScrollThrough?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    showOverlay?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    theme?: {
        type: StringConstructor;
        value?: 'loading' | 'success' | 'error';
    };
}
