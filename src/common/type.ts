export declare type RawValueType = string | number;
export interface OptionType{
    value?: RawValueType;
    title?: React.ReactNode;
    label?: React.ReactNode;
    key?: React.Key;
    children?: OptionType[];
    disabled?: boolean;
    checkable?: boolean;
    disableCheckbox?: boolean;
}