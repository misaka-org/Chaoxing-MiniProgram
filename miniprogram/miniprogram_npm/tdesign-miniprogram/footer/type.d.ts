export interface TdFooterProps {
    text?: {
        type: StringConstructor;
        value?: string;
    };
    logo?: {
        type: ObjectConstructor;
        value?: FooterLogo;
    };
    links?: {
        type: ArrayConstructor;
        value?: Array<LinkObj>;
    };
}
export interface FooterLogo {
    icon: string;
    title?: string;
    titleUrl?: string;
}
export interface LinkObj {
    name: string;
    url?: string;
    openType?: 'navigate' | 'redirect' | 'relaunch' | 'switchTab' | 'navigateBack';
}
