import { SuperComponent } from '../common/src/index';
export default class Divider extends SuperComponent {
    externalClasses: string[];
    options: {
        addGlobalClass: boolean;
        multipleSlots: boolean;
    };
    properties: import("./type").TdDividerProps;
    data: {
        prefix: string;
        classPrefix: string;
    };
    observers: {
        lineColor(): void;
    };
    methods: {
        setStyle(): void;
    };
}
