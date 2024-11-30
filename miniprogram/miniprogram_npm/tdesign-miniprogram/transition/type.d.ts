export interface TdTransitionProps {
    appear?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    customClass?: {
        type: StringConstructor;
        value?: string;
    };
    destoryOnClose?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    duration?: {
        type: NumberConstructor;
        value?: number;
    };
    name?: {
        type: StringConstructor;
        value?: string;
    };
    visible?: {
        type: BooleanConstructor;
        value?: boolean;
    };
}
