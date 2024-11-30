export interface TdDividerProps {
    align?: {
        type: StringConstructor;
        value?: 'left' | 'right' | 'center';
    };
    content?: {
        type: StringConstructor;
        value?: string;
    };
    style?: {
        type: StringConstructor;
        value?: string;
    };
    dashed?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    externalClasses?: {
        type: ArrayConstructor;
        value?: ['t-class', 't-class-line', 't-class-content'];
    };
    layout?: {
        type: StringConstructor;
        value?: 'horizontal' | 'vertical';
    };
}
