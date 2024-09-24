import { observer } from "mobx-react-lite";
import { useStore } from "./StoreContext";
import Button from "./components/Button";
import Cell from "./components/Cell";

const GameOverScreen = observer(() => {
  const gameStore = useStore().gameStore;

  const handleClick = () => {
    gameStore.restartGame();
  };

  return (
    <>
      {gameStore.isGameOver && (
        <div className="fixed top-0 left-0 z-10 flex items-center justify-center w-screen h-screen p-4 bg-black bg-opacity-30">
          <div className=" w-full sm:w-[700px] p-4 rounded-lg text-black bg-gray-200 space-y-4">
            <div className="">Вы проиграли!</div>
            <Cell type="green" className="h-auto">
              <div className="w-full px-2">
                <div className="">{gameStore.msg}</div>
                <div className="text-sm italic text-right">
                  {gameStore.info?.author}
                </div>
              </div>
            </Cell>
            <div className="">
              <Button onClick={handleClick}>Заново</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
});
export default GameOverScreen;
