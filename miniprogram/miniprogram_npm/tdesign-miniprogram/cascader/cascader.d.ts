/// <reference types="miniprogram-api-typings" />
import { SuperComponent } from '../common/src/index';
import { TdCascaderProps } from './type';
export interface CascaderProps extends TdCascaderProps {
}
export default class Cascader extends SuperComponent {
    externalClasses: string[];
    options: WechatMiniprogram.Component.ComponentOptions;
    properties: TdCascaderProps<import("../common/common").TreeOptionData>;
    controlledProps: {
        key: string;
        event: string;
    }[];
    data: {
        prefix: string;
        name: string;
        stepIndex: number;
        selectedIndexes: any[];
        selectedValue: any[];
        scrollTopList: any[];
        steps: any[];
    };
    observers: {
        visible(v: any): void;
        value(): void;
        'selectedIndexes, options'(): void;
        stepIndex(): Promise<void>;
    };
    methods: {
        initWithValue(): void;
        getIndexesByValue(options: import("../common/common").TreeOptionData[], value: any): any[];
        updateScrollTop(): void;
        hide(trigger: any): void;
        onVisibleChange(): void;
        onClose(): void;
        onStepClick(e: any): void;
        onTabChange(e: any): void;
        handleSelect(e: any): void;
    };
}
