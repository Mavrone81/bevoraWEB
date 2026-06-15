import { CSSProperties } from "react";
export interface AvatarProps {
  src?: string;
  name?: string;
  size?: "sm" | "md" | "lg";
  style?: CSSProperties;
}
/** Round avatar with image or initials fallback (gold gradient). */
export function Avatar(props: AvatarProps): JSX.Element;
