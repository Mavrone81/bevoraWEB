import { ReactNode, CSSProperties } from "react";
/**
 * Bevora surface card.
 * @startingPoint section="Surfaces" subtitle="White card with hairline border + soft shadow" viewport="700x260"
 */
export interface CardProps {
  children?: ReactNode;
  /** Adds hover lift + stronger shadow. */
  interactive?: boolean;
  /** Featured card — gold top-rule. */
  accent?: boolean;
  padding?: string;
  style?: CSSProperties;
}
/** Bevora surface card. */
export function Card(props: CardProps): JSX.Element;
