export interface TdRadioProps<T = RadioValue> {
    placement?: {
        type: StringConstructor;
        value?: 'left' | 'right';
    };
    allowUncheck?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    block?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    checked?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    defaultChecked?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    content?: {
        type: StringConstructor;
        value?: string;
    };
    contentDisabled?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    style?: {
        type: StringConstructor;
        value?: string;
    };
    readonly?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    disabled?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    externalClasses?: {
        type: ArrayConstructor;
        value?: ['t-class', 't-class-icon', 't-class-label', 't-class-content', 't-class-border'];
    };
    icon?: {
        type: null;
        value?: 'circle' | 'line' | Array<string>;
    };
    label?: {
        type: StringConstructor;
        value?: string;
    };
    maxContentRow?: {
        type: NumberConstructor;
        value?: number;
    };
    maxLabelRow?: {
        type: NumberConstructor;
        value?: number;
    };
    name?: {
        type: StringConstructor;
        value?: string;
    };
    value?: {
        type: null;
        value?: T;
    };
}
export declare type RadioValue = string | number | boolean;
