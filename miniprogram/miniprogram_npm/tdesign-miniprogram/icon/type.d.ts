export interface TdIconProps {
    style?: {
        type: StringConstructor;
        value?: string;
        required?: boolean;
    };
    color?: {
        type: StringConstructor;
        value?: string;
        required?: boolean;
    };
    name: {
        type: StringConstructor;
        value?: string;
        required?: boolean;
    };
    size?: {
        type: StringConstructor;
        value?: string;
        required?: boolean;
    };
    prefix?: {
        type: StringConstructor;
        value?: string;
        reuqired?: boolean;
    };
}
