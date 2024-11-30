const props = {
    direction: {
        type: String,
        value: 'row',
    },
    duration: {
        type: Number,
        value: 2000,
    },
    externalClasses: {
        type: Array,
    },
    icon: {
        type: null,
    },
    message: {
        type: String,
    },
    overlayProps: {
        type: Object,
        value: {},
    },
    placement: {
        type: String,
        value: 'middle',
    },
    preventScrollThrough: {
        type: Boolean,
        value: false,
    },
    showOverlay: {
        type: Boolean,
        value: false,
    },
    theme: {
        type: String,
    },
};
export default props;
