const props = {
    autoClose: {
        type: Boolean,
        value: true,
    },
    cancelBtn: {
        type: null,
        value: true,
    },
    confirmBtn: {
        type: null,
        value: true,
    },
    header: {
        type: Boolean,
        value: true,
    },
    keys: {
        type: Object,
    },
    title: {
        type: String,
        value: '',
    },
    value: {
        type: Array,
        value: null,
    },
    defaultValue: {
        type: Array,
    },
    visible: {
        type: Boolean,
        value: false,
    },
    popupProps: {
        type: Object,
        value: {},
    },
};
export default props;
