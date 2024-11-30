export interface TdSearchProps {
    style?: {
        type: StringConstructor;
        value?: string;
    };
    action?: {
        type: StringConstructor;
        value?: string;
    };
    center?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    disabled?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    externalClasses?: {
        type: ArrayConstructor;
        value?: ['t-class', 't-class-input', 't-class-input-container', 't-class-cancel', 't-class-left', 't-class-right'];
    };
    cursorSpacing?: {
        type: NumberConstructor;
        value?: number;
    };
    focus?: {
        type: BooleanConstructor;
        value?: boolean;
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
    placeholderStyle: {
        type: StringConstructor;
        value?: string;
    };
    placeholderClass?: {
        type: StringConstructor;
        value?: string;
    };
    leftIcon?: {
        type: StringConstructor;
        value?: string;
    };
    placeholder?: {
        type: StringConstructor;
        value?: string;
    };
    rightIcon?: {
        type: StringConstructor;
        value?: string;
    };
    shape?: {
        type: StringConstructor;
        value?: 'square' | 'round';
    };
    value?: {
        type: StringConstructor;
        value?: string;
    };
    clearable: {
        type: BooleanConstructor;
        value?: boolean;
    };
    type: {
        type: StringConstructor;
        value?: string;
    };
}
