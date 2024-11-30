export interface TdStepperProps {
    style?: {
        type: StringConstructor;
        value?: string;
    };
    disableInput?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    disabled?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    externalClasses?: {
        type: ArrayConstructor;
        value?: ['t-class', 't-class-input', 't-class-add', 't-class-minus'];
    };
    inputWidth?: {
        type: NumberConstructor;
        value?: number;
    };
    max?: {
        type: NumberConstructor;
        value?: number;
    };
    min?: {
        type: NumberConstructor;
        value?: number;
    };
    step?: {
        type: NumberConstructor;
        value?: number;
    };
    size?: {
        type: StringConstructor;
        value?: string;
    };
    theme?: {
        type: StringConstructor;
        value?: 'normal' | 'filled' | 'outline';
    };
    value?: {
        type: StringConstructor;
        optionalTypes: Array<NumberConstructor>;
        value?: string | number;
    };
    defaultValue?: {
        type: StringConstructor;
        optionalTypes: Array<NumberConstructor>;
        value?: string | number;
    };
}
