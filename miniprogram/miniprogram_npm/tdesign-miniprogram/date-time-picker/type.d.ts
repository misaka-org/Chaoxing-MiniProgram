export interface TdDateTimePickerProps {
    cancelBtn?: {
        type: StringConstructor;
        value?: string;
    };
    confirmBtn?: {
        type: StringConstructor;
        value?: string;
    };
    end?: {
        type: null;
        value?: string | number;
    };
    externalClasses?: {
        type: ArrayConstructor;
        value?: ['t-class', 't-class-confirm', 't-class-cancel', 't-class-title'];
    };
    format?: {
        type: StringConstructor;
        value?: string;
    };
    header?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    mode?: {
        type: null;
        value?: DateTimePickerMode;
    };
    showWeek?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    start?: {
        type: null;
        value?: string | number;
    };
    steps?: {
        type: ObjectConstructor;
        value?: object;
    };
    title?: {
        type: StringConstructor;
        value?: string;
    };
    value?: {
        type: null;
        value?: DateValue;
    };
    defaultValue?: {
        type: null;
        value?: DateValue;
    };
    visible?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    popupProps: {
        type: Object;
        value: {};
    };
    customLocale?: {
        type: StringConstructor;
        value: String;
    };
}
export declare type DateTimePickerMode = TimeModeValues | Array<TimeModeValues>;
export declare type TimeModeValues = 'year' | 'month' | 'date' | 'hour' | 'minute' | 'second';
export declare type DateValue = string | number;
