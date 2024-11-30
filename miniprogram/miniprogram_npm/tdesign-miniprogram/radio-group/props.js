const props = {
    placement: {
        type: String,
        value: 'left',
    },
    borderless: {
        type: Boolean,
        value: false,
    },
    disabled: {
        type: Boolean,
        value: undefined,
    },
    icon: {
        type: null,
        value: 'circle',
    },
    keys: {
        type: Object,
    },
    name: {
        type: String,
        value: '',
    },
    options: {
        type: Array,
    },
    value: {
        type: null,
        value: null,
    },
    defaultValue: {
        type: null,
    },
};
export default props;
