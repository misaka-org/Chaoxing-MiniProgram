export interface TdStepsProps {
    current?: {
        type: null;
        value?: string | number;
    };
    defaultCurrent?: {
        type: null;
        value?: string | number;
    };
    currentStatus?: {
        type: StringConstructor;
        value?: 'default' | 'process' | 'finish' | 'error';
    };
    externalClasses?: {
        type: ArrayConstructor;
        value?: ['t-class'];
    };
    layout?: {
        type: StringConstructor;
        value?: 'horizontal' | 'vertical';
    };
    readonly?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    separator?: {
        type: StringConstructor;
        value?: 'line' | 'dashed' | 'arrow';
    };
    sequence?: {
        type: StringConstructor;
        value?: 'positive' | 'reverse';
    };
    theme?: {
        type: StringConstructor;
        value?: 'default' | 'dot';
    };
}
