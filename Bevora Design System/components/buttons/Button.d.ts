import { ReactNode, CSSProperties } from "react";

/**
 * Bevora button — the primary action control.
 * @startingPoint section="Buttons" subtitle="Primary, accent, secondary, ghost & danger buttons" viewport="700x220"
 */
export interface ButtonProps {
  children?: ReactNode;
  /** Visual style. @default "primary" */
  variant?: "primary" | "accent" | "secondary" | "ghost" | "danger";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: CSSProperties;
}

/**
 * Bevora button — the primary action control.
 */
export function Button(props: ButtonProps): JSX.Element;
