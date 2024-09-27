import { useEffect } from "react";
import {
  ShakeLettersInString,
  checkMatch,
  getUnikLettersFromString,
  isSymbol,
} from "./utils";
import { useStore } from "./StoreContext";
import { observer } from "mobx-react-lite";
import Cell from "./components/Cell";

const Game = observer(() => {
  const gameStore = useStore().gameStore;

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
    if (questString[gameStore.selectedSymbolId] === letter) {
      gameStore.shifrateSymbol(
        shifrString[gameStore.selectedSymbolId],
        letter as string
      );
    }
    gameStore.nextStep();
  };

  return (
    <>
      <div className="flex text-3xl items-center max-w-[800px] gap-y-2 gap-x-1 w-full justify-center flex-wrap">
        {shifrString.map((item, i) => (
          <div className="" key={i}>
            {checkMatch(item, questString[i]) && !isSymbol(item) && (
              <Cell type="green" className={``}>
                {item}
              </Cell>
            )}
            {isSymbol(item) && (
              <Cell
                type="inherit"
                className={`p-1  w-12 h-12 flex items-center justify-center `}
              >
                {item}
              </Cell>
            )}
            {!checkMatch(item, questString[i]) && !isSymbol(item) && (
              <Cell
                type="red"
                onClick={() => {
                  gameStore.setSelectedSymbolId(i);
                }}
                className={`p-1 font-bold cursor-pointer w-12 text-center h-12 flex items-center justify-center border-red-600 border-2`}
              >
                {item}
              </Cell>
            )}
          </div>
        ))}

        {gameStore.selectedSymbolId >= 0 && (
          <div
            onClick={(e) =>
              e.target === e.currentTarget && gameStore.setSelectedSymbolId(-1)
            }
            className="fixed top-0 left-0 z-10 flex items-center justify-center w-screen h-screen p-4 bg-black bg-opacity-30"
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
        )}
      </div>
      <div className="italic text-right">{gameStore.info?.author}</div>
    </>
  );
});

export default Game;
