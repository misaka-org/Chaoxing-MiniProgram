export interface TdIndexesAnchorProps {
    style?: {
        type: StringConstructor;
        value?: string;
    };
    externalClasses?: {
        type: ArrayConstructor;
        value?: ['t-class'];
    };
    index?: {
        type: null;
        value?: string | number;
    };
}
