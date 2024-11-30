import { ButtonProps } from '../button/index';
export interface TdDialogProps {
    actions?: {
        type: ArrayConstructor;
        value?: Array<ButtonProps>;
    };
    buttonLayout?: {
        type: StringConstructor;
        value?: 'horizontal' | 'vertical';
    };
    cancelBtn?: {
        type: null;
        value?: string | ButtonProps | null;
    };
    closeBtn?: {
        type: null;
        value?: boolean | object;
    };
    closeOnOverlayClick?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    confirmBtn?: {
        type: null;
        value?: string | ButtonProps | null;
    };
    content?: {
        type: StringConstructor;
        value?: string;
    };
    style?: {
        type: StringConstructor;
        value?: string;
    };
    externalClasses?: {
        type: ArrayConstructor;
        value?: ['t-class', 't-class-content', 't-class-confirm', 't-class-cancel'];
    };
    overlayProps?: {
        type: ObjectConstructor;
        value?: object;
    };
    preventScrollThrough?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    showOverlay?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    title?: {
        type: StringConstructor;
        value?: string;
    };
    visible?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    zIndex?: {
        type: NumberConstructor;
        value?: number;
    };
}
