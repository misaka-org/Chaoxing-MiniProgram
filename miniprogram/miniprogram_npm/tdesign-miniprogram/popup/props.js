const props = {
    closeBtn: {
        type: Boolean,
    },
    closeOnOverlayClick: {
        type: Boolean,
        value: true,
    },
    content: {
        type: String,
    },
    duration: {
        type: Number,
        value: 240,
    },
    externalClasses: {
        type: Array,
    },
    overlayProps: {
        type: Object,
        value: {},
    },
    placement: {
        type: String,
        value: 'top',
    },
    preventScrollThrough: {
        type: Boolean,
        value: true,
    },
    showOverlay: {
        type: Boolean,
        value: true,
    },
    transitionProps: {
        type: Object,
    },
    visible: {
        type: Boolean,
        value: null,
    },
    defaultVisible: {
        type: Boolean,
        value: false,
    },
    zIndex: {
        type: Number,
        value: 11500,
    },
};
export default props;
