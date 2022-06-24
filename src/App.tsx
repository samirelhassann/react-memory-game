import { useState, useEffect } from "react";
import * as C from "./App.styles";
import memoryGameIcon from "./assets/memoryGameIcon.png";
import RestartIcon from "./svgs/restart.svg";
import Button from "./components/Button";
import InfoItem from "./components/InfoItem";
import { GridItemType } from "./types/GridItemType";
import { items } from "./data/items";
import GridItem from "./components/GridItem";
import { formatTimeElapsed } from "./helpers/formatTimeElapsed";

const App = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [lockChoose, setLockChoose] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

  useEffect(() => {
    resetAndCreateGrid();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (playing) setTimeElapsed(timeElapsed + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, timeElapsed]);

  useEffect(() => {
    if (gridItems.every((item) => item.permanentShown)) setPlaying(false);
  }, [gridItems]);

  const resetAndCreateGrid = () => {
    setTimeElapsed(0);
    setMoveCount(0);

    const tmpGrid: GridItemType[] = [];
    for (let i = 0; i < items.length * 2; i++)
      tmpGrid.push({
        id: i,
        item: null,
        shown: false,
        permanentShown: false,
      });

    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) {
        let pos = -1;
        while (pos < 0 || tmpGrid[pos].item)
          pos = Math.floor(Math.random() * (items.length * 2));

        tmpGrid[pos] = { ...tmpGrid[pos], item: items[i] };
      }
    }

    setGridItems(tmpGrid);

    setPlaying(true);
  };

  const handleItemClick = (id: number) => {
    if (!lockChoose && playing) {
      const clickedCard = gridItems.find((item) => item.id === id);

      setGridItems(
        [...gridItems].map((card) => {
          if (card.id === id) card.shown = true;

          return card;
        })
      );

      const founded = gridItems.filter(
        (card) => card.item!.id === clickedCard?.item!.id && card.shown
      );

      if (founded.length === 2)
        setGridItems(
          [...gridItems].map((card) => {
            if (card.item!.id === clickedCard?.item!.id && card.shown)
              card.permanentShown = true;

            return card;
          })
        );

      setMoveCount(moveCount + 1);

      if (moveCount % 2 !== 0) {
        setLockChoose(true);

        setTimeout(() => {
          setGridItems(
            [...gridItems].map((card) => {
              if (card.shown) card.shown = false;

              return card;
            })
          );

          setLockChoose(false);
        }, 1000);
      }
    }
  };

  return (
    <C.Container>
      <C.Info>
        <C.TitleContainer>
          <img src={memoryGameIcon} alt="" width="50" height="50"></img>
          <C.Title>Memory Game</C.Title>
        </C.TitleContainer>

        <C.InfoArea>
          <InfoItem
            label="Time"
            value={formatTimeElapsed(timeElapsed)}
          ></InfoItem>
          <InfoItem label="Movements" value={moveCount.toString()}></InfoItem>
        </C.InfoArea>

        <Button label="Start" icon={RestartIcon} onClick={resetAndCreateGrid} />
      </C.Info>

      <C.GridArea>
        <C.Grid>
          {gridItems.map((item, index) => (
            <GridItem
              key={index}
              item={item}
              onClick={() => handleItemClick(item.id)}
            />
          ))}
        </C.Grid>
      </C.GridArea>
    </C.Container>
  );
};

export default App;
