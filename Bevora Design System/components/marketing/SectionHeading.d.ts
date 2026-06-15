import { ReactNode, CSSProperties } from "react";
export interface SectionHeadingProps {
  kicker?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  style?: CSSProperties;
}
/** Eyebrow + heading + subtitle — the standard section intro. */
export function SectionHeading(props: SectionHeadingProps): JSX.Element;
