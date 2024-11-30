import { SuperComponent } from '../common/src/index';
export default class ActionSheet extends SuperComponent {
    static show: (options: import("./show").ActionSheetShowOption) => WechatMiniprogram.Component.TrivialInstance;
    externalClasses: string[];
    properties: {
        align?: {
            type: StringConstructor;
            value?: "center" | "left";
        };
        cancelText?: {
            type: StringConstructor;
            value?: string;
        };
        count?: {
            type: NumberConstructor;
            value?: number;
        };
        description?: {
            type: StringConstructor;
            value?: string;
        };
        items: {
            type: ArrayConstructor;
            value?: (string | import("./type").ActionSheetItem)[];
        };
        popupProps?: {
            type: ObjectConstructor;
            value?: object;
        };
        showCancel?: {
            type: BooleanConstructor;
            value?: boolean;
        };
        showOverlay?: {
            type: BooleanConstructor;
            value?: boolean;
        };
        theme?: {
            type: StringConstructor;
            value?: "list" | "grid";
        };
        visible: {
            type: BooleanConstructor;
            value?: boolean;
        };
        defaultVisible: {
            type: BooleanConstructor;
            value?: boolean;
        };
    };
    data: {
        prefix: string;
        classPrefix: string;
        gridThemeItems: any[];
        currentSwiperIndex: number;
        defaultPopUpProps: {};
        defaultPopUpzIndex: number;
    };
    controlledProps: {
        key: string;
        event: string;
    }[];
    ready(): void;
    methods: {
        onSwiperChange(e: WechatMiniprogram.TouchEvent): void;
        splitGridThemeActions(): void;
        show(options: any): void;
        memoInitialData(): void;
        close(): void;
        onPopupVisibleChange({ detail }: {
            detail: any;
        }): void;
        onSelect(event: WechatMiniprogram.TouchEvent): void;
        onCancel(): void;
    };
}
