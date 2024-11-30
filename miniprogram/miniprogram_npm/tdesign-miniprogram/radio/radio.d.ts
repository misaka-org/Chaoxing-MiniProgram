import { SuperComponent, RelationsOptions } from '../common/src/index';
export default class Radio extends SuperComponent {
    externalClasses: string[];
    behaviors: string[];
    relations: RelationsOptions;
    options: {
        multipleSlots: boolean;
    };
    lifetimes: {
        attached(): void;
    };
    properties: {
        borderless: {
            type: BooleanConstructor;
            value: boolean;
        };
        placement?: {
            type: StringConstructor;
            value?: "left" | "right";
        };
        allowUncheck?: {
            type: BooleanConstructor;
            value?: boolean;
        };
        block?: {
            type: BooleanConstructor;
            value?: boolean;
        };
        checked?: {
            type: BooleanConstructor;
            value?: boolean;
        };
        defaultChecked?: {
            type: BooleanConstructor;
            value?: boolean;
        };
        content?: {
            type: StringConstructor;
            value?: string;
        };
        contentDisabled?: {
            type: BooleanConstructor;
            value?: boolean;
        };
        style?: {
            type: StringConstructor;
            value?: string;
        };
        readonly?: {
            type: BooleanConstructor;
            value?: boolean;
        };
        disabled?: {
            type: BooleanConstructor;
            value?: boolean;
        };
        externalClasses?: {
            type: ArrayConstructor;
            value?: ["t-class", "t-class-icon", "t-class-label", "t-class-content", "t-class-border"];
        };
        icon?: {
            type: null;
            value?: string[] | "circle" | "line";
        };
        label?: {
            type: StringConstructor;
            value?: string;
        };
        maxContentRow?: {
            type: NumberConstructor;
            value?: number;
        };
        maxLabelRow?: {
            type: NumberConstructor;
            value?: number;
        };
        name?: {
            type: StringConstructor;
            value?: string;
        };
        value?: {
            type: null;
            value?: import("./type").RadioValue;
        };
    };
    controlledProps: {
        key: string;
        event: string;
    }[];
    data: {
        prefix: string;
        classPrefix: string;
        customIcon: boolean;
        slotIcon: boolean;
        optionLinked: boolean;
        iconVal: any[];
        _placement: string;
    };
    methods: {
        handleTap(e: any): void;
        doChange(): void;
        init(): void;
        setDisabled(disabled: Boolean): void;
    };
}
