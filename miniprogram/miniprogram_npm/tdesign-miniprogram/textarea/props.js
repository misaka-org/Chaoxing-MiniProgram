const props = {
    adjustPosition: {
        type: Boolean,
        value: true,
    },
    autofocus: {
        type: Boolean,
        value: false,
    },
    autosize: {
        type: null,
        value: false,
    },
    confirmHold: {
        type: Boolean,
        value: false,
    },
    confirmType: {
        type: String,
        value: 'return',
    },
    cursorSpacing: {
        type: Number,
        value: 0,
    },
    disabled: {
        type: Boolean,
        value: false,
    },
    externalClasses: {
        type: Array,
    },
    focus: {
        type: Boolean,
        value: false,
    },
    label: {
        type: String,
    },
    fixed: {
        type: Boolean,
        value: false,
    },
    maxcharacter: {
        type: Number,
    },
    maxlength: {
        type: Number,
        value: -1,
    },
    placeholder: {
        type: String,
        value: undefined,
    },
    placeholderStyle: {
        type: String,
        value: '',
    },
    value: {
        type: String,
        value: null,
    },
    defaultValue: {
        type: String,
        value: '',
    },
    bordered: {
        type: Boolean,
        value: false,
    },
    indicator: {
        type: Boolean,
        value: false,
    },
    cursor: {
        type: Number,
        value: -1,
    },
    showConfirmBar: {
        type: Boolean,
        value: true,
    },
    selectionStart: {
        type: Number,
        value: -1,
    },
    selectionEnd: {
        type: Number,
        value: -1,
    },
    disableDefaultPadding: {
        type: Boolean,
        value: false,
    },
    holdKeyboard: {
        type: Boolean,
        value: false,
    },
};
export default props;
