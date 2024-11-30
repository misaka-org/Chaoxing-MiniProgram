export interface TdCellProps {
    align?: {
        type: StringConstructor;
        value?: 'top' | 'middle' | 'bottom';
    };
    arrow?: {
        type: null;
        value?: boolean | object;
    };
    bordered?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    style?: {
        type: StringConstructor;
        value?: string;
    };
    description?: {
        type: StringConstructor;
        value?: string;
    };
    externalClasses?: {
        type: ArrayConstructor;
        value?: [
            't-class',
            't-class-title',
            't-class-note',
            't-class-description',
            't-class-thumb',
            't-class-hover',
            't-class-left',
            't-class-right'
        ];
    };
    hover?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    image?: {
        type: StringConstructor;
        value?: string;
    };
    jumpType?: {
        type: StringConstructor;
        value?: 'switchTab' | 'reLaunch' | 'redirectTo' | 'navigateTo';
    };
    leftIcon?: {
        type: null;
        value?: string | object;
    };
    note?: {
        type: StringConstructor;
        value?: string;
    };
    required?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    rightIcon?: {
        type: null;
        value?: string | object;
    };
    title?: {
        type: StringConstructor;
        value?: string;
    };
    url?: {
        type: StringConstructor;
        value?: string;
    };
}
