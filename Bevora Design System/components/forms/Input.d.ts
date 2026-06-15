import { ReactNode, CSSProperties, InputHTMLAttributes } from "react";
/**
 * Bevora text input with label, hint/error and optional leading icon.
 * @startingPoint section="Forms" subtitle="Labeled text field with hint, error & icon states" viewport="700x200"
 */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  iconLeft?: ReactNode;
  style?: CSSProperties;
}
/** Bevora text input with label, hint/error and optional leading icon. */
export function Input(props: InputProps): JSX.Element;
