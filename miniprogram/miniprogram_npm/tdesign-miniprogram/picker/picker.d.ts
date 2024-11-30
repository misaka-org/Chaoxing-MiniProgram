import { SuperComponent, RelationsOptions } from '../common/src/index';
export default class Picker extends SuperComponent {
    properties: import("./type").TdPickerProps;
    externalClasses: string[];
    options: {
        multipleSlots: boolean;
    };
    relations: RelationsOptions;
    observers: {
        'value, visible'(): void;
        keys(obj: any): void;
    };
    data: {
        prefix: string;
        classPrefix: string;
        labelAlias: string;
        valueAlias: string;
        defaultPopUpProps: {};
        defaultPopUpzIndex: number;
    };
    methods: {
        updateChildren(): void;
        getSelectedValue(): any[];
        getColumnIndexes(): any;
        onConfirm(): void;
        triggerColumnChange({ column, index }: {
            column: any;
            index: any;
        }): void;
        onCancel(): void;
        onPopupChange(e: any): void;
        close(trigger: any): void;
    };
    ready(): void;
}
