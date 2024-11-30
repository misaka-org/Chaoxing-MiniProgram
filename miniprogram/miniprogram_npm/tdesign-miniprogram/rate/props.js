const props = {
    allowHalf: {
        type: Boolean,
        value: false,
    },
    color: {
        type: null,
        value: '#ED7B2F',
    },
    count: {
        type: Number,
        value: 5,
    },
    disabled: {
        type: Boolean,
    },
    externalClasses: {
        type: Array,
    },
    gap: {
        type: null,
        value: 8,
    },
    iconPrefix: {
        type: String,
        value: undefined,
    },
    icon: {
        type: null,
    },
    showText: {
        type: Boolean,
        value: false,
    },
    size: {
        type: String,
        value: '24px',
    },
    texts: {
        type: Array,
        value: [],
    },
    value: {
        type: Number,
        value: null,
    },
    defaultValue: {
        type: Number,
        value: 0,
    },
    placement: {
        type: String,
        value: 'top',
    },
};
export default props;
