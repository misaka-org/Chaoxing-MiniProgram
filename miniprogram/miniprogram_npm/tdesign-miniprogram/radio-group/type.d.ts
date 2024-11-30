import { RadioValue } from '../radio/type';
import { KeysType } from '../common/common';
export interface TdRadioGroupProps<T = RadioValue> {
    placement?: {
        type: StringConstructor;
        value?: 'left' | 'right';
    };
    borderless?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    style?: {
        type: StringConstructor;
        value?: string;
    };
    disabled?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    icon?: {
        type: null;
        value?: 'circle' | 'line' | 'dot' | Array<string>;
    };
    keys?: {
        type: ObjectConstructor;
        value?: KeysType;
    };
    name?: {
        type: StringConstructor;
        value?: string;
    };
    options?: {
        type: ArrayConstructor;
        value?: Array<RadioOption>;
    };
    value?: {
        type: null;
        value?: T;
    };
    defaultValue?: {
        type: null;
        value?: T;
    };
}
export declare type RadioOption = string | number | RadioOptionObj;
export interface RadioOptionObj {
    label?: string;
    value?: string | number;
    readonly?: boolean;
    disabled?: boolean;
    allowUncheck?: boolean;
}
