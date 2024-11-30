/// <reference types="miniprogram-api-typings" />
import { SuperComponent } from '../common/src/index';
import { TdCalendarProps } from './type';
export interface CalendarProps extends TdCalendarProps {
}
export default class Calendar extends SuperComponent {
    externalClasses: string[];
    options: WechatMiniprogram.Component.ComponentOptions;
    properties: TdCalendarProps;
    data: {
        prefix: string;
        classPrefix: string;
        months: any[];
        scrollIntoView: string;
        innerConfirmBtn: {
            content: string;
        };
    };
    controlledProps: {
        key: string;
        event: string;
    }[];
    lifetimes: {
        created(): void;
        ready(): void;
    };
    observers: {
        type(v: any): void;
        confirmBtn(v: any): void;
        'firstDayOfWeek,minDate,maxDate'(firstDayOfWeek: any, minDate: any, maxDate: any): void;
        value(v: any): void;
        visible(v: any): void;
        format(v: any): void;
    };
    methods: {
        initialValue(): void;
        scrollIntoView(): void;
        calcMonths(): void;
        close(trigger: any): void;
        onVisibleChange(): void;
        handleClose(): void;
        handleSelect(e: any): void;
        onTplButtonTap(): void;
        toTime(val: any): any;
    };
}
