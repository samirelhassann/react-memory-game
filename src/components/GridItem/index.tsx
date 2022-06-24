import React from "react";
import { GridItemType } from "../../types/GridItemType";
import * as C from "./styles";
import { items } from "../../data/items";
import backSvg from "../../svgs/b7.svg";

interface Props {
  item: GridItemType;
  onClick: () => void;
}

const GridItem = ({ item, onClick }: Props): JSX.Element => {
  console.log(item.item!.name);
  return (
    <C.Container
      showBackGround={item.permanentShown || item.shown}
      onClick={onClick}
    >
      <C.Icon
        isShown={item.permanentShown || item.shown}
        src={item.permanentShown || item.shown ? item.item!.icon : backSvg}
      />
    </C.Container>
  );
};

export default GridItem;
