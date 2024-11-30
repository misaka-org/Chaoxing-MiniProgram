import { BadgeProps } from '../badge/index';
export interface TdTabBarItemProps {
    badgeProps?: {
        type: ObjectConstructor;
        value?: BadgeProps;
    };
    style?: {
        type: StringConstructor;
        value?: string;
    };
    icon?: {
        type: StringConstructor;
        value?: string;
    };
    subTabBar?: {
        type: ArrayConstructor;
        value?: SubTabBarItem[];
    };
    value?: {
        type: null;
        value?: string | number;
    };
}
export interface SubTabBarItem {
    value: string;
    label: string;
}
