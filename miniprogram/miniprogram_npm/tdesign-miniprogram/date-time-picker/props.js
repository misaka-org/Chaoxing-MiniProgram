const props = {
    cancelBtn: {
        type: String,
        value: '',
    },
    confirmBtn: {
        type: String,
        value: '',
    },
    end: {
        type: null,
    },
    externalClasses: {
        type: Array,
    },
    format: {
        type: String,
        value: 'YYYY-MM-DD HH:mm:ss',
    },
    header: {
        type: Boolean,
        value: true,
    },
    mode: {
        type: null,
        value: 'date',
    },
    showWeek: {
        type: Boolean,
        value: false,
    },
    start: {
        type: null,
    },
    steps: {
        type: Object,
    },
    title: {
        type: String,
        value: '',
    },
    value: {
        type: null,
        value: null,
    },
    defaultValue: {
        type: null,
    },
    visible: {
        type: Boolean,
        value: false,
    },
    popupProps: {
        type: Object,
        value: {},
    },
    customLocale: {
        type: String,
        value: 'zh',
    },
};
export default props;
