import { ReactNode, CSSProperties } from "react";
/**
 * Service / feature tile with gold icon chip — the marketing site's core unit.
 * @startingPoint section="Marketing" subtitle="Service tile with gold icon chip, title, copy & link" viewport="380x300"
 */
export interface ServiceCardProps {
  /** Lucide icon name (string) or a ReactNode. */
  icon?: ReactNode;
  title: ReactNode;
  children?: ReactNode;
  href?: string;
  linkLabel?: string;
  style?: CSSProperties;
}
/** Service / feature tile with gold icon chip — the marketing site's core unit. */
export function ServiceCard(props: ServiceCardProps): JSX.Element;
