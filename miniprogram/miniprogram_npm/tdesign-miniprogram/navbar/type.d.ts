export interface TdNavbarProps {
    animation?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    style?: {
        type: StringConstructor;
        value?: string;
    };
    delta?: {
        type: NumberConstructor;
        value?: number;
    };
    externalClasses?: {
        type: ArrayConstructor;
        value?: ['t-class', 't-class-title', 't-class-left-icon', 't-class-home-icon', 't-class-capsule'];
    };
    fixed?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    leftArrow?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    title?: {
        type: StringConstructor;
        value?: string;
    };
    titleMaxLength?: {
        type: NumberConstructor;
        value?: number;
    };
    visible?: {
        type: BooleanConstructor;
        value?: boolean;
    };
}
