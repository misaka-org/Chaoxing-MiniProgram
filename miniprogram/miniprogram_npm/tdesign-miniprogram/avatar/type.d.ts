import { BadgeProps } from '../badge/index';
export interface TdAvatarProps {
    alt?: {
        type: StringConstructor;
        value?: string;
    };
    badgeProps?: {
        type: ObjectConstructor;
        value?: BadgeProps;
    };
    bordered?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    style?: {
        type: StringConstructor;
        value?: string;
    };
    externalClasses?: {
        type: ArrayConstructor;
        value?: ['t-class', 't-class-image', 't-class-icon', 't-class-alt', 't-class-content'];
    };
    hideOnLoadFailed?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    icon?: {
        type: null;
        value?: string | object;
    };
    image?: {
        type: StringConstructor;
        value?: string;
    };
    imageProps?: {
        type: ObjectConstructor;
        value?: object;
    };
    shape?: {
        type: StringConstructor;
        value?: ShapeEnum;
    };
    size?: {
        type: StringConstructor;
        value?: string;
    };
}
export declare type ShapeEnum = 'circle' | 'round';
