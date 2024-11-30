export interface TdBackTopProps {
    style?: {
        type: StringConstructor;
        value?: string;
    };
    externalClasses?: {
        type: ArrayConstructor;
        value?: ['t-class', 't-class-icon', 't-class-text'];
    };
    visibilityHeight?: {
        type: NumberConstructor;
        value?: 200;
    };
    scrollTop?: {
        type: NumberConstructor;
        value: 0;
    };
    fixed?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    icon?: {
        type: null;
        value?: boolean | string | object;
    };
    text?: {
        type: StringConstructor;
        value?: string;
    };
    theme?: {
        type: StringConstructor;
        value?: 'round' | 'half-round' | 'round-dark' | 'half-round-dark';
    };
}
