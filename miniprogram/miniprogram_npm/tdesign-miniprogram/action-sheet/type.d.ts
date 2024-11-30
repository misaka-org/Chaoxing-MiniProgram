export interface TdActionSheetProps {
    align?: {
        type: StringConstructor;
        value?: 'center' | 'left';
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
        value?: Array<string | ActionSheetItem>;
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
        value?: 'list' | 'grid';
    };
    visible: {
        type: BooleanConstructor;
        value?: boolean;
    };
    defaultVisible: {
        type: BooleanConstructor;
        value?: boolean;
    };
}
export interface ActionSheetItem {
    label: string;
    color?: string;
    disabled?: boolean;
    icon?: string;
    suffixIcon?: string;
}
