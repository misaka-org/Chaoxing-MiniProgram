import { LoadingProps } from '../loading/index';
import { SizeEnum } from '../common/common';
export interface TdButtonProps {
    tId?: {
        type: StringConstructor;
        value?: string;
    };
    block?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    content?: {
        type: StringConstructor;
        value?: string;
    };
    customDataset?: {
        type: ObjectConstructor;
        value?: any;
    };
    disabled?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    externalClasses?: {
        type: ArrayConstructor;
        value?: ['t-class', 't-class-icon', 't-class-loading'];
    };
    ghost?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    icon?: {
        type: null;
        value?: string | object;
    };
    loading?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    loadingProps?: {
        type: ObjectConstructor;
        value?: LoadingProps;
    };
    shape?: {
        type: StringConstructor;
        value?: 'rectangle' | 'square' | 'round' | 'circle';
    };
    size?: {
        type: StringConstructor;
        value?: SizeEnum;
    };
    theme?: {
        type: StringConstructor;
        value?: 'default' | 'primary' | 'danger';
    };
    type?: {
        type: StringConstructor;
        value?: 'submit' | 'reset';
    };
    variant?: {
        type: StringConstructor;
        value?: 'base' | 'outline' | 'text';
    };
    openType?: {
        type: StringConstructor;
        value?: 'contact' | 'share' | 'getPhoneNumber' | 'getUserInfo' | 'launchApp' | 'openSetting' | 'feedback' | 'chooseAvatar' | 'agreePrivacyAuthorization';
    };
    hoverClass?: {
        type: StringConstructor;
        value?: string;
    };
    hoverStopPropagation?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    hoverStartTime?: {
        type: NumberConstructor;
        value?: number;
    };
    hoverStayTime?: {
        type: NumberConstructor;
        value?: number;
    };
    lang?: {
        type: StringConstructor;
        value?: 'en' | 'zh_CN' | 'zh_TW';
    };
    sessionFrom?: {
        type: StringConstructor;
        value?: string;
    };
    sendMessageTitle?: {
        type: StringConstructor;
        value?: string;
    };
    sendMessagePath?: {
        type: StringConstructor;
        value?: string;
    };
    sendMessageImg?: {
        type: StringConstructor;
        value?: string;
    };
    appParameter?: {
        type: StringConstructor;
        value?: string;
    };
    showMessageCard?: {
        type: BooleanConstructor;
        value?: boolean;
    };
}
