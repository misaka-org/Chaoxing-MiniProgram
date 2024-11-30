const props = {
    disabled: {
        type: Boolean,
        value: false,
    },
    externalClasses: {
        type: Array,
    },
    label: {
        type: null,
        value: false,
    },
    marks: {
        type: null,
        value: {},
    },
    max: {
        type: Number,
        value: 100,
    },
    min: {
        type: Number,
        value: 0,
    },
    range: {
        type: Boolean,
        value: false,
    },
    showExtremeValue: {
        type: Boolean,
        value: false,
    },
    step: {
        type: Number,
        value: 1,
    },
    theme: {
        type: String,
        value: 'default',
    },
    value: {
        type: null,
        value: null,
    },
    defaultValue: {
        type: null,
        value: 0,
    },
    vertical: {
        type: Boolean,
        value: false,
    },
};
export default props;
