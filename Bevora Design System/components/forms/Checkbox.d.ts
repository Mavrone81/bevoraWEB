import { ReactNode, CSSProperties } from "react";
export interface CheckboxProps {
  label?: ReactNode;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  id?: string;
  style?: CSSProperties;
}
/** Labeled checkbox (gold when checked). */
export function Checkbox(props: CheckboxProps): JSX.Element;
