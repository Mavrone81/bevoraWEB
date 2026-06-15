import { ReactNode, CSSProperties } from "react";

export interface IconButtonProps {
  children?: ReactNode;
  variant?: "primary" | "accent" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  "aria-label"?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: CSSProperties;
}

/** Square icon-only button matching Button's variants. */
export function IconButton(props: IconButtonProps): JSX.Element;
