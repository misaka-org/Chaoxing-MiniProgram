import { SuperComponent, RelationsOptions } from '../common/src/index';
export default class CellGroup extends SuperComponent {
    externalClasses: string[];
    relations: RelationsOptions;
    options: {
        addGlobalClass: boolean;
    };
    properties: import("./type").TdCellGroupProps;
    data: {
        prefix: string;
        classPrefix: string;
    };
    lifetimes: {
        ready(): void;
    };
    methods: {
        updateLastChid(): void;
    };
}
