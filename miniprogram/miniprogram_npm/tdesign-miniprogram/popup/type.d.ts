import { TdTransitionProps } from '../transition/index';
export interface TdPopupProps {
    closeBtn?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    closeOnOverlayClick?: {
        type: BooleanConstructor;
        value?: boolean;
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
        value?: ['t-class', 't-class-overlay', 't-class-content'];
    };
    overlayProps?: {
        type: ObjectConstructor;
        value?: object;
    };
    placement?: {
        type: StringConstructor;
        value?: 'top' | 'left' | 'right' | 'bottom' | 'center';
    };
    preventScrollThrough?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    showOverlay?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    transitionProps?: {
        type: ObjectConstructor;
        value?: TdTransitionProps;
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
}
export interface PopupVisibleChangeContext {
    trigger: 'close-btn' | 'overlay';
}
