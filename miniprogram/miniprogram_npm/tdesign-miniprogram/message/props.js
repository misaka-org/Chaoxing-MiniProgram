const props = {
    action: {
        type: String,
    },
    align: {
        type: String,
        value: 'left',
    },
    closeBtn: {
        type: null,
        value: false,
    },
    content: {
        type: String,
    },
    duration: {
        type: Number,
        value: 3000,
    },
    externalClasses: {
        type: Array,
    },
    icon: {
        type: null,
        value: true,
    },
    marquee: {
        type: null,
        value: false,
    },
    offset: {
        type: Array,
    },
    theme: {
        type: String,
        value: 'info',
    },
    visible: {
        type: Boolean,
        value: false,
    },
    defaultVisible: {
        type: Boolean,
        value: false,
    },
    zIndex: {
        type: Number,
        value: 15000,
    },
    link: {
        type: null,
    },
};
export default props;
