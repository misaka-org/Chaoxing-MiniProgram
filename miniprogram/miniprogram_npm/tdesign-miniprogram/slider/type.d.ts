export interface TdSliderProps {
    style?: {
        type: StringConstructor;
        value?: string;
    };
    disabled?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    externalClasses?: {
        type: ArrayConstructor;
        value?: ['t-class', 't-class-bar', 't-class-bar-active', 't-class-bar-disabled', 't-class-cursor'];
    };
    label?: {
        type: null;
        value?: string | boolean;
    };
    marks?: {
        type: null;
        value?: Record<number, string> | Array<number>;
    };
    max?: {
        type: NumberConstructor;
        value?: number;
    };
    min?: {
        type: NumberConstructor;
        value?: number;
    };
    range?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    showExtremeValue?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    step?: {
        type: NumberConstructor;
        value?: number;
    };
    theme?: {
        type: StringConstructor;
        value?: 'default' | 'capsule';
    };
    value?: {
        type: null;
        value?: SliderValue;
    };
    defaultValue?: {
        type: null;
        value?: SliderValue;
    };
    vertical?: {
        type: BooleanConstructor;
        value?: boolean;
    };
}
export declare type SliderValue = number | Array<number>;
