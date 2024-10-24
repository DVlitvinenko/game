import { useEffect, useMemo } from "react";
import { ShakeLettersInString, getUnikLettersFromString } from "./utils";
import { useStore } from "./StoreContext";
import { observer } from "mobx-react-lite";
import { playSoundError, playSoundRightClick } from "./sounds";
import Game from "./Game";

const GameContainer = observer(() => {
  const gameStore = useStore().gameStore;
  const { info, selectedSymbolId } = gameStore;

  useEffect(() => {
    gameStore.startGame();
  }, []);

  const shifrArray = gameStore.msg.split("");

  const questString = useMemo(
    () => gameStore.defaultMsg.split(""),
    [gameStore.defaultMsg]
  );

  const lettersToSelect = ShakeLettersInString(
    getUnikLettersFromString(gameStore.defaultMsg).filter(
      (symbol) => !shifrArray.includes(symbol as string)
    ) as string[]
  );

  const onLetterChose = (letter: string) => {
    if (questString[gameStore.selectedSymbolId] === letter) {
      gameStore.shifrateSymbol(
        shifrArray[gameStore.selectedSymbolId],
        letter as string
      );
      playSoundRightClick();
    } else {
      playSoundError();
    }
    gameStore.nextStep();
  };

  return (
    <>
      <Game
        author={info?.author ?? ""}
        lettersToSelect={lettersToSelect}
        onLetterChose={(letter) => onLetterChose(letter)}
        onSymbolSelect={(id) => gameStore.setSelectedSymbolId(id)}
        questString={questString}
        selectedSymbolId={selectedSymbolId}
        shifrArray={shifrArray}
      />
    </>
  );
});

export default GameContainer;
