import { ReactNode, CSSProperties } from "react";
export interface SwitchProps {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: ReactNode;
  disabled?: boolean;
  id?: string;
  style?: CSSProperties;
}
/** Toggle switch (gold when on). */
export function Switch(props: SwitchProps): JSX.Element;
