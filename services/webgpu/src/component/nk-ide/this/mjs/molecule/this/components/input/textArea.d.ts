import React from 'react';
import { TextAreaProps } from 'rc-textarea';
export interface ITextAreaProps extends TextAreaProps {
    showCount?: boolean;
    maxLength?: number;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}
export declare const TextArea: ({ showCount, maxLength, className, style, onChange, ...props }: ITextAreaProps) => React.JSX.Element;
