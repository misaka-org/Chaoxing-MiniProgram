export interface TdSwipeCellProps {
    style?: {
        type: StringConstructor;
        value?: string;
    };
    disabled?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    left?: {
        type: ArrayConstructor;
        value?: Array<SwipeActionItem>;
    };
    opened?: {
        type: BooleanConstructor;
        optionalTypes: Array<ArrayConstructor>;
        value?: boolean | Array<boolean>;
        required?: boolean;
    };
    right?: {
        type: ArrayConstructor;
        value?: Array<SwipeActionItem>;
    };
}
export interface SwipeActionItem {
    text: string;
    className?: string;
    style?: string;
    onClick?: () => void;
    [key: string]: any;
}
