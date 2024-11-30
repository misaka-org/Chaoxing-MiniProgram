import { SizeEnum } from '../common/common';
export interface TdLinkProps {
    content?: {
        type: StringConstructor;
        value?: string;
    };
    navigatorProps?: {
        type: ObjectConstructor;
        value?: object;
    };
    prefixIcon?: {
        type: null;
        value?: string | object;
    };
    size?: {
        type: StringConstructor;
        value?: SizeEnum;
    };
    status?: {
        type: StringConstructor;
        value?: 'normal' | 'active' | 'disabled';
    };
    disabled?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    hover?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    suffixIcon?: {
        type: null;
        value?: string | object;
    };
    theme?: {
        type: StringConstructor;
        value?: 'default' | 'primary' | 'danger' | 'warning' | 'success';
    };
    underline?: {
        type: BooleanConstructor;
        value?: boolean;
    };
}
