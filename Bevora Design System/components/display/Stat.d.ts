import { ReactNode, CSSProperties } from "react";
export interface StatProps {
  value: ReactNode;
  label: ReactNode;
  caption?: ReactNode;
  style?: CSSProperties;
}
/** Big metric figure with gold uppercase label — for proof bands. */
export function Stat(props: StatProps): JSX.Element;
