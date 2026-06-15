import { ReactNode, CSSProperties, SelectHTMLAttributes } from "react";
export interface SelectOption { value: string; label: string; }
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: ReactNode;
  hint?: ReactNode;
  options?: (SelectOption | string)[];
  style?: CSSProperties;
}
/** Styled native select with custom chevron. */
export function Select(props: SelectProps): JSX.Element;
