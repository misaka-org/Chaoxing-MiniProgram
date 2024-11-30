import { SuperComponent } from '../common/src/index';
export default class Fab extends SuperComponent {
    properties: import("./type").TdFabProps;
    externalClasses: string[];
    data: {
        prefix: string;
        classPrefix: string;
        buttonData: {
            size: string;
            shape: string;
            theme: string;
            externalClass: string;
        };
        moveStyle: any;
    };
    observers: {
        'buttonProps.**, icon, text, ariaLabel'(): void;
    };
    methods: {
        onTplButtonTap(e: any): void;
        onMove(e: any): void;
        computedSize(): void;
    };
}
