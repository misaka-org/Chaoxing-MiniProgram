export interface TdSkeletonProps {
    animation?: {
        type: StringConstructor;
        value?: 'gradient' | 'flashed' | 'none';
    };
    style?: {
        type: StringConstructor;
        value?: string;
    };
    delay?: {
        type: NumberConstructor;
        value?: number;
    };
    externalClasses?: {
        type: ArrayConstructor;
        value?: ['t-class', 't-class-avatar', 't-class-image', 't-class-text'];
    };
    loading?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    rowCol?: {
        type: ArrayConstructor;
        value?: SkeletonRowCol;
    };
    theme?: {
        type: StringConstructor;
        value?: 'avatar' | 'image' | 'text' | 'paragraph';
    };
}
export declare type SkeletonRowCol = Array<Number | SkeletonRowColObj | Array<SkeletonRowColObj>>;
export interface SkeletonRowColObj {
    width?: string;
    size?: string;
    height?: string;
    marginRight?: string;
    marginLeft?: string;
    margin?: string;
    type?: 'rect' | 'circle' | 'text';
}
