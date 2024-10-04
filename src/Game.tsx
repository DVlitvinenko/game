import { useEffect, useMemo } from "react";
import { ShakeLettersInString, getUnikLettersFromString } from "./utils";
import { useStore } from "./StoreContext";
import { observer } from "mobx-react-lite";
import Cell from "./components/Cell";
import LetterCell from "./components/LetterCell";
import AnimatedModal from "./AnimatedModal";
import { playSoundError, playSoundRightClick } from "./sounds";

const Game = observer(() => {
  const gameStore = useStore().gameStore;

  useEffect(() => {
    gameStore.startGame();
  }, []);

  const shifrString = gameStore.msg.split("");
  const questString = useMemo(
    () => gameStore.defaultMsg.split(""),
    [gameStore.defaultMsg]
  );

  const lettersToSelect = ShakeLettersInString(
    getUnikLettersFromString(gameStore.defaultMsg).filter(
      (symbol) => !shifrString.includes(symbol as string)
    ) as string[]
  );

  const handleChooseLetter = (letter: string) => {
    if (questString[gameStore.selectedSymbolId] === letter) {
      gameStore.shifrateSymbol(
        shifrString[gameStore.selectedSymbolId],
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
      <div className="flex text-3xl items-center max-w-[800px] pt-16 gap-y-2 gap-x-1 w-full justify-center flex-wrap">
        {shifrString.map((item, i) => {
          let count = 0;
          const checkedItem = item === shifrString[gameStore.selectedSymbolId];
          if (!checkedItem) {
            count++;
          }
          return (
            <div className="" key={`${i}${count}`}>
              <LetterCell item={item} index={i} questString={questString} />
            </div>
          );
        })}
        <AnimatedModal
          onClose={() => gameStore.setSelectedSymbolId(-1)}
          isVisible={gameStore.selectedSymbolId >= 0}
        >
          <div
            onClick={(e) =>
              e.target === e.currentTarget && gameStore.setSelectedSymbolId(-1)
            }
            className="fixed top-0 left-0 z-10 flex items-center justify-center w-screen h-screen p-4 "
          >
            <div className=" w-full  sm:w-[700px] p-10 rounded-lg text-black bg-gray-50 space-y-4">
              <p>
                Введите новое значение для символа "
                <span className="font-bold">
                  {shifrString[gameStore.selectedSymbolId]}
                </span>
                "
              </p>
              <div className="flex flex-wrap items-center justify-center gap-1">
                {lettersToSelect.map((letter, i) => (
                  <Cell
                    type="green"
                    onClick={() => {
                      handleChooseLetter(letter);
                    }}
                    className="cursor-pointer hover:bg-white"
                    key={`${letter as string}_${i}`}
                  >
                    {letter as string}
                  </Cell>
                ))}
              </div>
            </div>
          </div>
        </AnimatedModal>
      </div>
      <div className="italic text-right">{gameStore.info?.author}</div>
    </>
  );
});

export default Game;
