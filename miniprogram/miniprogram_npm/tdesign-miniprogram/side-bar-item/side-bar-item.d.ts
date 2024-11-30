import { SuperComponent, RelationsOptions } from '../common/src/index';
export default class SideBarItem extends SuperComponent {
    externalClasses: string[];
    properties: import("./type").TdSideBarItemProps;
    relations: RelationsOptions;
    observers: {
        icon(v: any): void;
    };
    data: {
        classPrefix: string;
        prefix: string;
        active: boolean;
        isPre: boolean;
        isNext: boolean;
    };
    methods: {
        updateActive(value: any): void;
        handleClick(): void;
    };
}
