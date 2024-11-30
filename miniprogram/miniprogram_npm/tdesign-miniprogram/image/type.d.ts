export interface TdImageProps {
    style?: {
        type: StringConstructor;
        value?: string;
    };
    error?: {
        type: StringConstructor;
        value?: string;
    };
    externalClasses?: {
        type: ArrayConstructor;
        value?: ['t-class', 't-class-load'];
    };
    height?: {
        type: null;
        value?: string | number;
    };
    lazy?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    loading?: {
        type: StringConstructor;
        value?: string;
    };
    mode?: {
        type: StringConstructor;
        value?: 'scaleToFill' | 'aspectFit' | 'aspectFill' | 'widthFix' | 'heightFix' | 'top' | 'bottom' | 'center' | 'left' | 'right' | 'top left' | 'top right' | 'bottom left' | 'bottom right';
    };
    shape?: {
        type: StringConstructor;
        value?: 'circle' | 'round' | 'square';
    };
    showMenuByLongpress?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    src?: {
        type: StringConstructor;
        value?: string;
    };
    webp?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    width?: {
        type: null;
        value?: string | number;
    };
}
