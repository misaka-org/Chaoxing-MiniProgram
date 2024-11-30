import { SuperComponent } from '../common/src/index';
import type { TreeOptionData } from '../common/common';
export default class TreeSelect extends SuperComponent {
    externalClasses: string[];
    options: {
        multipleSlots: boolean;
    };
    data: {
        prefix: string;
        classPrefix: string;
    };
    properties: import("./type").TdTreeSelectProps<TreeOptionData>;
    controlledProps: {
        key: string;
        event: string;
    }[];
    observers: {
        'value, options, keys, multiple'(): void;
    };
    methods: {
        buildTreeOptions(): void;
        onRootChange(e: any): void;
        handleTreeClick(e: any): void;
        handleRadioChange(e: any): void;
    };
}
