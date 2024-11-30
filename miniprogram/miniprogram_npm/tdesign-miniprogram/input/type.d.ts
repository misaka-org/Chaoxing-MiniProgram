export interface TdInputProps {
    align?: {
        type: StringConstructor;
        value?: 'left' | 'center' | 'right';
    };
    layout?: {
        type: StringConstructor;
        value?: 'horizontal' | 'vertical';
    };
    borderless?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    clearable?: {
        type: null;
        value?: boolean | object;
    };
    clearTrigger?: {
        type: StringConstructor;
        value?: 'always' | 'focus';
    };
    style?: {
        type: StringConstructor;
        value?: string;
    };
    disabled?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    errorMessage?: {
        type: StringConstructor;
        value?: string;
    };
    externalClasses?: {
        type: ArrayConstructor;
        value?: ['t-class', 't-class-input', 't-class-placeholder', 't-class-error-msg'];
    };
    format?: {
        type: null;
        value?: InputFormatType;
    };
    label?: {
        type: StringConstructor;
        value?: string;
    };
    maxcharacter?: {
        type: NumberConstructor;
        value?: number;
    };
    maxlength?: {
        type: NumberConstructor;
        value?: number;
    };
    placeholder?: {
        type: StringConstructor;
        value?: string;
    };
    prefixIcon?: {
        type: null;
        value?: string | object;
    };
    readonly?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    size?: {
        type: StringConstructor;
        value?: 'medium' | 'small';
    };
    status?: {
        type: StringConstructor;
        value?: 'default' | 'success' | 'warning' | 'error';
    };
    suffix?: {
        type: StringConstructor;
        value?: string;
    };
    suffixIcon?: {
        type: null;
        value?: string | object;
    };
    tips?: {
        type: StringConstructor;
        value?: string;
    };
    type?: {
        type: StringConstructor;
        value?: 'text' | 'number' | 'idcard' | 'digit' | 'safe-password' | 'password' | 'nickname';
    };
    value?: {
        type: StringConstructor;
        optionalTypes: Array<NumberConstructor>;
        value?: InputValue;
    };
    defaultValue?: {
        type: StringConstructor;
        optionalTypes: Array<NumberConstructor>;
        value?: InputValue;
    };
    placeholderStyle: {
        type: StringConstructor;
        value?: string;
    };
    placeholderClass?: {
        type: StringConstructor;
        value?: string;
    };
    cursorSpacing?: {
        type: NumberConstructor;
        value?: number;
    };
    autoFocus?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    focus?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    confirmType?: {
        type: StringConstructor;
        value?: 'send' | 'search' | 'next' | 'go' | 'done';
    };
    alwaysEmbed?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    confirmHold?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    cursor: {
        type: NumberConstructor;
        value?: number;
    };
    selectionStart?: {
        type: NumberConstructor;
        value?: number;
    };
    selectionEnd?: {
        type: NumberConstructor;
        value?: number;
    };
    adjustPosition?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    holdKeyboard?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    safePasswordCertPath?: {
        type: StringConstructor;
        value?: string;
    };
    safePasswordLength?: {
        type: NumberConstructor;
        value?: number;
    };
    safePasswordTimeStamp?: {
        type: NumberConstructor;
        value?: number;
    };
    safePasswordNonce?: {
        type: StringConstructor;
        value?: string;
    };
    safePasswordSalt?: {
        type: StringConstructor;
        value?: string;
    };
    safePasswordCustomHash?: {
        type: StringConstructor;
        value?: string;
    };
}
export declare type InputFormatType = (value: InputValue) => number | string;
export declare type InputValue = string | number;
