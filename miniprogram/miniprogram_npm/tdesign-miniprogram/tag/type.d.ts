import { SizeEnum } from '../common/common';
export interface TdTagProps {
    closable?: {
        type: null;
        value?: boolean | object;
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
    icon?: {
        type: null;
        value?: string | object;
    };
    maxWidth?: {
        type: null;
        value?: string | number;
    };
    shape?: {
        type: StringConstructor;
        value?: 'square' | 'round' | 'mark';
    };
    size?: {
        type: StringConstructor;
        value?: SizeEnum;
    };
    theme?: {
        type: StringConstructor;
        value?: 'default' | 'primary' | 'warning' | 'danger' | 'success';
    };
    variant?: {
        type: StringConstructor;
        value?: 'dark' | 'light' | 'outline' | 'light-outline';
    };
}
