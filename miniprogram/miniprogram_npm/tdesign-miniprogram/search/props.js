const props = {
    action: {
        type: String,
        value: '',
    },
    center: {
        type: Boolean,
        value: false,
    },
    disabled: {
        type: Boolean,
        value: false,
    },
    externalClasses: {
        type: Array,
    },
    cursorSpacing: {
        type: Number,
        value: 0,
    },
    focus: {
        type: Boolean,
        value: false,
    },
    label: {
        type: String,
        value: '',
    },
    maxcharacter: {
        type: Number,
    },
    maxlength: {
        type: Number,
        value: -1,
    },
    confirmType: {
        type: String,
        value: 'search',
    },
    alwaysEmbed: {
        type: Boolean,
        value: false,
    },
    confirmHold: {
        type: Boolean,
        value: false,
    },
    cursor: {
        type: Number,
    },
    selectionStart: {
        type: Number,
        value: -1,
    },
    selectionEnd: {
        type: Number,
        value: -1,
    },
    adjustPosition: {
        type: Boolean,
        value: true,
    },
    holdKeyboard: {
        type: Boolean,
        value: false,
    },
    placeholderStyle: {
        type: String,
        value: '',
    },
    placeholderClass: {
        type: String,
        value: '',
    },
    leftIcon: {
        type: String,
        value: 'search',
    },
    placeholder: {
        type: String,
        value: '',
    },
    rightIcon: {
        type: String,
        value: 'close-circle-filled',
    },
    shape: {
        type: String,
        value: 'square',
    },
    value: {
        type: String,
        value: '',
    },
    clearable: {
        type: Boolean,
        value: true,
    },
    type: {
        type: String,
        value: 'text',
    },
};
export default props;
