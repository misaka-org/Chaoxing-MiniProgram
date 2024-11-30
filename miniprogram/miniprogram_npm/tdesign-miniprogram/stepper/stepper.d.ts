import { SuperComponent } from '../common/src/index';
export default class Stepper extends SuperComponent {
    externalClasses: string[];
    options: {
        addGlobalClass: boolean;
    };
    properties: {
        style?: {
            type: StringConstructor;
            value?: string;
        };
        disableInput?: {
            type: BooleanConstructor;
            value?: boolean;
        };
        disabled?: {
            type: BooleanConstructor;
            value?: boolean;
        };
        externalClasses?: {
            type: ArrayConstructor;
            value?: ["t-class", "t-class-input", "t-class-add", "t-class-minus"];
        };
        inputWidth?: {
            type: NumberConstructor;
            value?: number;
        };
        max?: {
            type: NumberConstructor;
            value?: number;
        };
        min?: {
            type: NumberConstructor;
            value?: number;
        };
        step?: {
            type: NumberConstructor;
            value?: number;
        };
        size?: {
            type: StringConstructor;
            value?: string;
        };
        theme?: {
            type: StringConstructor;
            value?: "outline" | "normal" | "filled";
        };
        value?: {
            type: StringConstructor;
            optionalTypes: NumberConstructor[];
            value?: string | number;
        };
        defaultValue?: {
            type: StringConstructor;
            optionalTypes: NumberConstructor[];
            value?: string | number;
        };
    };
    controlledProps: {
        key: string;
        event: string;
    }[];
    observers: {
        value(v: any): void;
    };
    data: {
        currentValue: number;
        classPrefix: string;
        prefix: string;
    };
    lifetimes: {
        attached(): void;
    };
    isDisabled(type: any): boolean;
    getLen(num: number): number;
    add(a: number, b: number): number;
    format(value: any): string;
    setValue(value: any): void;
    minusValue(): boolean;
    plusValue(): boolean;
    methods: {
        handleFocus(e: any): void;
        handleInput(e: any): void;
        handleBlur(e: any): void;
    };
}
