const props = {
    align: {
        type: String,
        value: 'left',
    },
    layout: {
        type: String,
        value: 'horizontal',
    },
    borderless: {
        type: Boolean,
        value: false,
    },
    clearable: {
        type: null,
        value: false,
    },
    clearTrigger: {
        type: String,
        value: 'always',
    },
    disabled: {
        type: Boolean,
        value: false,
    },
    errorMessage: {
        type: String,
        value: '',
    },
    externalClasses: {
        type: Array,
    },
    format: {
        type: null,
    },
    label: {
        type: String,
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
    prefixIcon: {
        type: null,
        value: null,
    },
    readonly: {
        type: Boolean,
        value: false,
    },
    size: {
        type: String,
        value: 'medium',
    },
    status: {
        type: String,
        value: 'default',
    },
    suffix: {
        type: String,
    },
    suffixIcon: {
        type: null,
        value: null,
    },
    tips: {
        type: String,
    },
    value: {
        type: String,
        optionalTypes: [Number],
        value: null,
    },
    defaultValue: {
        type: String,
        optionalTypes: [Number],
    },
    type: {
        type: String,
        value: 'text',
    },
    placeholderStyle: {
        type: String,
        value: '',
    },
    placeholderClass: {
        type: String,
        value: 'input-placeholder',
    },
    cursorSpacing: {
        type: Number,
        value: 0,
    },
    autoFocus: {
        type: Boolean,
        value: false,
    },
    focus: {
        type: Boolean,
        value: false,
    },
    confirmType: {
        type: String,
        value: 'done',
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
    safePasswordCertPath: {
        type: String,
        value: '',
    },
    safePasswordLength: {
        type: Number,
    },
    safePasswordTimeStamp: {
        type: Number,
    },
    safePasswordNonce: {
        type: String,
        value: '',
    },
    safePasswordSalt: {
        type: String,
        value: '',
    },
    safePasswordCustomHash: {
        type: String,
        value: '',
    },
};
export default props;
