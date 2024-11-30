export interface TdIndexesProps {
    style?: {
        type: StringConstructor;
        value?: string;
    };
    indexList?: {
        type: null;
        value?: string[] | number[];
    };
    list?: {
        type: ArrayConstructor;
        value?: ListItem[];
    };
    sticky?: {
        type: BooleanConstructor;
        value?: Boolean;
    };
    stickyOffset?: {
        type: NumberConstructor;
        value?: number;
    };
}
export interface ListItem {
    title: string;
    index: string;
    children: {
        title: string;
        [key: string]: any;
    }[];
}
