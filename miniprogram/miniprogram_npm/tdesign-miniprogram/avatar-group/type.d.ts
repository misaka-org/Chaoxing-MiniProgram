export interface TdAvatarGroupProps {
    cascading?: {
        type: StringConstructor;
        value?: CascadingValue;
    };
    collapseAvatar?: {
        type: StringConstructor;
        value?: string;
    };
    style?: {
        type: StringConstructor;
        value?: string;
    };
    externalClasses?: {
        type: ArrayConstructor;
        value?: ['t-class', 't-class-image', 't-class-content'];
    };
    max?: {
        type: NumberConstructor;
        value?: number;
    };
    size?: {
        type: StringConstructor;
        value?: string;
    };
}
export declare type CascadingValue = 'left-up' | 'right-up';
