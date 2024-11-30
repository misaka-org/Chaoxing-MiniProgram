export interface TdGridProps {
    align?: {
        type: StringConstructor;
        value?: 'left' | 'center';
    };
    border?: {
        type: null;
        value?: boolean | {
            color?: string;
            width?: string;
            style?: 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'inset' | 'outset';
        };
    };
    column?: {
        type: NumberConstructor;
        value?: number;
    };
    style?: {
        type: StringConstructor;
        value?: string;
    };
    externalClasses?: {
        type: ArrayConstructor;
        value?: ['t-class'];
    };
    gutter?: {
        type: NumberConstructor;
        value?: number;
    };
    hover?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    theme?: {
        type: StringConstructor;
        value?: 'default' | 'card';
    };
}
