export interface TdTextareaProps {
    adjustPosition?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    autofocus?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    autosize?: {
        type: null;
        value?: boolean | object;
    };
    confirmHold?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    confirmType?: {
        type: StringConstructor;
        value?: 'return' | 'send' | 'search' | 'next' | 'go' | 'done';
    };
    cursorSpacing?: {
        type: NumberConstructor;
        value?: number;
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
        value?: ['t-class', 't-class-textarea', 't-class-label'];
    };
    fixed?: {
        type: BooleanConstructor;
        value?: boolean;
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
    placeholder?: {
        type: StringConstructor;
        value?: string;
    };
    placeholderStyle: {
        type: StringConstructor;
        value: string;
    };
    value?: {
        type: StringConstructor;
        value?: string;
    };
    defaultValue?: {
        type: StringConstructor;
        value?: string;
    };
    bordered?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    indicator?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    cursor: {
        type: NumberConstructor;
        value?: number;
    };
    showConfirmBar: {
        type: BooleanConstructor;
        value?: boolean;
    };
    selectionStart?: {
        type: NumberConstructor;
        value?: number;
    };
    selectionEnd?: {
        type: NumberConstructor;
        value?: number;
    };
    disableDefaultPadding?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    holdKeyboard?: {
        type: BooleanConstructor;
        value?: boolean;
    };
}
