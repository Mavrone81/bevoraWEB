import { ReactNode, CSSProperties, TextareaHTMLAttributes } from "react";
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  style?: CSSProperties;
}
/** Multi-line text field matching Input. */
export function Textarea(props: TextareaProps): JSX.Element;
