const props = {
    current: {
        type: null,
        value: null,
    },
    defaultCurrent: {
        type: null,
    },
    currentStatus: {
        type: String,
        value: 'process',
    },
    externalClasses: {
        type: Array,
    },
    layout: {
        type: String,
        value: 'horizontal',
    },
    readonly: {
        type: Boolean,
        value: false,
    },
    separator: {
        type: String,
        value: 'line',
    },
    sequence: {
        type: String,
        value: 'positive',
    },
    theme: {
        type: String,
        value: 'default',
    },
};
export default props;
