import { RelationsOptions, SuperComponent } from '../common/src/index';
import type { TdDropdownItemProps } from './type';
export interface DropdownItemProps extends TdDropdownItemProps {
}
export default class DropdownMenuItem extends SuperComponent {
    externalClasses: string[];
    properties: {
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
            value?: ["t-class", "t-class-content", "t-class-column", "t-class-column-item", "t-class-column-item-label", "t-class-footer"];
        };
        keys?: {
            type: ObjectConstructor;
            value?: import("../common/common").KeysType;
        };
        label?: {
            type: StringConstructor;
            value?: string;
        };
        multiple?: {
            type: BooleanConstructor;
            value?: boolean;
        };
        options?: {
            type: ArrayConstructor;
            value?: import("./type").DropdownOption[];
        };
        optionsColumns?: {
            type: null;
            value?: string | number;
        };
        optionsLayout?: {
            type: StringConstructor;
            value?: string;
        };
        value?: {
            type: null;
            value?: import("./type").DropdownValue;
        };
        defaultValue?: {
            type: null;
            value?: import("./type").DropdownValue;
        };
    };
    data: {
        prefix: string;
        classPrefix: string;
        show: boolean;
        top: number;
        maskHeight: number;
        initValue: any;
        hasChanged: boolean;
        duration: string | number;
        zIndex: number;
        overlay: boolean;
        labelAlias: string;
        valueAlias: string;
        computedLabel: string;
        firstCheckedValue: string;
    };
    relations: RelationsOptions;
    controlledProps: {
        key: string;
        event: string;
    }[];
    observers: {
        keys(obj: any): void;
        value(v: any): void;
        'label, computedLabel'(): void;
        show(visible: any): void;
    };
    methods: {
        closeDropdown(): void;
        getParentBottom(cb: any): void;
        handleTreeClick(e: any): void;
        handleRadioChange(e: any): void;
        handleMaskClick(): void;
        handleReset(): void;
        handleConfirm(): void;
        onLeaved(): void;
    };
}
