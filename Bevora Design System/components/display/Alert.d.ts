import { ReactNode, CSSProperties } from "react";
export interface AlertProps {
  children?: ReactNode;
  tone?: "success" | "warning" | "danger" | "info";
  title?: ReactNode;
  style?: CSSProperties;
}
/** Inline status/notification banner with left accent rule. */
export function Alert(props: AlertProps): JSX.Element;
