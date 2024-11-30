import { SuperComponent } from '../common/src/index';
export default class Search extends SuperComponent {
    externalClasses: string[];
    options: {
        multipleSlots: boolean;
    };
    properties: import("./type").TdSearchProps;
    observers: {};
    data: {
        classPrefix: string;
        prefix: string;
    };
    onInput(e: any): void;
    onFocus(e: any): void;
    onBlur(e: any): void;
    handleClear(): void;
    onConfirm(e: any): void;
    onActionClick(): void;
}
