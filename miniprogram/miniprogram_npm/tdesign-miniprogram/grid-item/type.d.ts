import { BadgeProps } from '../badge/index';
export interface TdGridItemProps {
    badgeProps?: {
        type: ObjectConstructor;
        value?: BadgeProps;
    };
    style?: {
        type: StringConstructor;
        value?: string;
    };
    description?: {
        type: StringConstructor;
        value?: string;
    };
    externalClasses?: {
        type: ArrayConstructor;
        value?: ['t-class', 't-class-image', 't-class-text', 't-class-description'];
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
    jumpType?: {
        type: StringConstructor;
        value?: 'redirect-to' | 'switch-tab' | 'relaunch' | 'navigate-to';
    };
    layout?: {
        type: StringConstructor;
        value?: 'vertical' | 'horizontal';
    };
    text?: {
        type: StringConstructor;
        value?: string;
    };
    url?: {
        type: StringConstructor;
        value?: string;
    };
}
