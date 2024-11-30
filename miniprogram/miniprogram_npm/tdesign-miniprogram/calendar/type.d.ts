import { ButtonProps } from '../button/index';
export interface TdCalendarProps {
    autoClose?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    confirmBtn?: {
        type: null;
        value?: string | ButtonProps | null;
    };
    style?: {
        type: StringConstructor;
        value?: string;
    };
    firstDayOfWeek?: {
        type: NumberConstructor;
        value?: number;
    };
    format?: {
        type: undefined;
        value?: CalendarFormatType;
    };
    maxDate?: {
        type: NumberConstructor;
        value?: number;
    };
    minDate?: {
        type: NumberConstructor;
        value?: number;
    };
    title?: {
        type: StringConstructor;
        value?: string;
    };
    type?: {
        type: StringConstructor;
        value?: 'single' | 'multiple' | 'range';
    };
    usePopup?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    value?: {
        type: null;
        value?: number | number[];
    };
    defaultValue?: {
        type: null;
        value?: number | number[];
    };
    visible?: {
        type: BooleanConstructor;
        value?: boolean;
    };
}
export declare type CalendarFormatType = (day: TDate) => TDate;
export declare type TDateType = 'selected' | 'disabled' | 'start' | 'centre' | 'end' | '';
export interface TDate {
    date: Date;
    day: number;
    type: TDateType;
    className?: string;
    prefix?: string;
    suffix?: string;
}
