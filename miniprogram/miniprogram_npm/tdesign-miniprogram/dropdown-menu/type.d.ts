export interface TdDropdownMenuProps {
    arrowIcon?: {
        type: null;
        value?: string | object;
    };
    closeOnClickOverlay?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    duration?: {
        type: null;
        value?: string | number;
    };
    externalClasses?: {
        type: ArrayConstructor;
        value?: ['t-class', 't-class-item', 't-class-label', 't-class-icon'];
    };
    showOverlay?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    zIndex?: {
        type: NumberConstructor;
        value?: number;
    };
}
