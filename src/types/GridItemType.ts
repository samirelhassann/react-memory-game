import { Card } from "./Card";

export type GridItemType = {
  id: number;
  item: Card | null;
  shown: boolean;
  permanentShown: boolean;
};
