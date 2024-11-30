const props = {
    disableInput: {
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
    inputWidth: {
        type: Number,
    },
    max: {
        type: Number,
        value: 100,
    },
    min: {
        type: Number,
        value: 0,
    },
    step: {
        type: Number,
        value: 1,
    },
    size: {
        type: String,
        value: 'medium',
    },
    theme: {
        type: String,
        value: 'normal',
    },
    value: {
        type: String,
        optionalTypes: [Number],
        value: null,
    },
    defaultValue: {
        type: String,
        optionalTypes: [Number],
        value: 0,
    },
};
export default props;
