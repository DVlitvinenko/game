import { useEffect } from "react";
import {
  ShakeLettersInString,
  checkMatch,
  getUnikLettersFromString,
  isSymbol,
} from "./utils";
import { useStore } from "./StoreContext";
import { observer } from "mobx-react-lite";
import content from "./assets/json/content.json";

const Game = observer(() => {
  const gameStore = useStore().gameStore;

  const info = content.find((i) => i.id === gameStore.msgId);

  useEffect(() => {
    gameStore.startGame();
  }, []);

  const shifrString = gameStore.msg.split("");
  const questString = gameStore.defaultMsg.split("");

  const lettersToSelect = ShakeLettersInString(
    getUnikLettersFromString(gameStore.defaultMsg).filter(
      (symbol) => !shifrString.includes(symbol as string)
    ) as string[]
  );

  const handleChooseLetter = (letter: string) => {
    questString[gameStore.selectedSymbolId] === letter &&
      gameStore.shifrateSymbol(
        shifrString[gameStore.selectedSymbolId],
        letter as string
      );
    gameStore.setSelectedSymbolId(-1);
    gameStore.checkWin();
  };

  return (
    <>
      <div className="mb-4">Уровень {gameStore.finishedIds.length + 1}</div>
      <div className="flex text-3xl items-center max-w-[800px] gap-y-2 gap-x-1 w-full justify-center flex-wrap">
        {shifrString.map((item, i) => (
          <div className="" key={i}>
            {checkMatch(item, questString[i]) && !isSymbol(item) && (
              <p
                className={`p-1 w-12 h-12 flex items-center justify-center border border-green-500`}
              >
                {item}
              </p>
            )}
            {isSymbol(item) && (
              <p className={`p-1  w-12 h-12 flex items-center justify-center `}>
                {item}
              </p>
            )}
            {!checkMatch(item, questString[i]) && !isSymbol(item) && (
              <p
                onClick={() => {
                  gameStore.setSelectedSymbolId(i);
                }}
                className={`p-1 font-bold cursor-pointer w-12 text-center h-12 flex items-center justify-center border-red-600 border-2`}
              >
                {item}
              </p>
            )}
          </div>
        ))}

        {gameStore.selectedSymbolId >= 0 && (
          <div className="fixed top-0 left-0 z-10 flex items-center justify-center w-screen h-screen bg-black bg-opacity-30">
            <div className=" w-[200px] sm:w-[700px] p-10 rounded-lg text-black bg-gray-200 ">
              <p>
                Введите новое значение для символа "
                {shifrString[gameStore.selectedSymbolId]}"
              </p>
              <div className="flex flex-wrap items-center justify-center gap-1">
                {lettersToSelect.map((letter, i) => (
                  <div
                    onClick={() => {
                      handleChooseLetter(letter);
                    }}
                    className="flex items-center justify-center w-12 h-12 border border-black cursor-pointer hover:bg-gray-400"
                    key={`${letter as string}_${i}`}
                  >
                    {letter as string}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="italic text-right">{info?.author}</div>
    </>
  );
});

export default Game;
