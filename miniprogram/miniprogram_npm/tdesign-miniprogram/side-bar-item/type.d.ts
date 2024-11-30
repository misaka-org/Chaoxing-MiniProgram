export interface TdSideBarItemProps {
    badgeProps?: {
        type: ObjectConstructor;
        value?: object;
    };
    disabled?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    icon?: {
        type: null;
    };
    label?: {
        type: StringConstructor;
        value?: string;
    };
    value?: {
        type: null;
        value?: string | number;
    };
}
