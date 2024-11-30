import { SuperComponent } from '../common/src/index';
export default class Overlay extends SuperComponent {
    properties: {
        zIndex: {
            type: NumberConstructor;
            value: number;
        };
        duration: {
            type: NumberConstructor;
            value: number;
        };
        backgroundColor: {
            type: StringConstructor;
            value: string;
        };
        preventScrollThrough: {
            type: BooleanConstructor;
            value: boolean;
        };
    };
    behaviors: string[];
    data: {
        prefix: string;
        classPrefix: string;
        computedStyle: string;
        _zIndex: number;
    };
    observers: {
        backgroundColor(v: any): void;
        zIndex(v: any): void;
    };
    methods: {
        handleClick(): void;
        noop(): void;
    };
}
