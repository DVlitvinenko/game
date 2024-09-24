import { observer } from "mobx-react-lite";
import { useStore } from "./StoreContext";
import Button from "./components/Button";
import Cell from "./components/Cell";

const WinScreen = observer(() => {
  const gameStore = useStore().gameStore;

  const info = gameStore.getInfo();

  const handleClick = () => {
    gameStore.nextGame();
  };

  return (
    <>
      {gameStore.isWin && (
        <div className="fixed top-0 left-0 z-10 flex items-center justify-center w-screen h-screen p-4 bg-black bg-opacity-30">
          <div className=" w-full sm:w-[700px] p-4 rounded-lg text-black bg-gray-200 space-y-4">
            <div className="">Решено!</div>
            <Cell type="green" className="h-auto">
              <div className="w-full px-2">
                <div className="">{gameStore.defaultMsg}</div>
                <div className="text-sm italic text-right">{info?.author}</div>
              </div>
            </Cell>
            <div className="">
              <Button onClick={handleClick}>Дальше</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
});
export default WinScreen;
