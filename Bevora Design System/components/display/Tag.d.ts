import { ReactNode, CSSProperties } from "react";
export interface TagProps {
  children?: ReactNode;
  onRemove?: (e: React.MouseEvent) => void;
  style?: CSSProperties;
}
/** Keyword chip; pass onRemove for a removable tag. */
export function Tag(props: TagProps): JSX.Element;
