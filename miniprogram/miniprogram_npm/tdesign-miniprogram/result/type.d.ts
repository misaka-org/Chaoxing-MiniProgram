export interface TdResultProps {
    style?: {
        type: StringConstructor;
        value?: string;
    };
    description?: {
        type: StringConstructor;
        value?: string;
    };
    externalClasses?: {
        type: ArrayConstructor;
        value?: ['t-class', 't-class-description', 't-class-image'];
    };
    icon?: {
        type: null;
        value?: boolean | string | object;
    };
    image?: {
        type: StringConstructor;
        value?: string;
    };
    theme?: {
        type: StringConstructor;
        value?: 'default' | 'success' | 'warning' | 'error';
    };
    title?: {
        type: StringConstructor;
        value?: string;
    };
}
