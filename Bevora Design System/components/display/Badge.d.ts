import { ReactNode, CSSProperties } from "react";
export interface BadgeProps {
  children?: ReactNode;
  tone?: "neutral" | "gold" | "success" | "warning" | "danger" | "info";
  solid?: boolean;
  style?: CSSProperties;
}
/** Small status pill / label. */
export function Badge(props: BadgeProps): JSX.Element;
