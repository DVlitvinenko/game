import { observer } from "mobx-react-lite";
import { useStore } from "./StoreContext";
import Button from "./components/Button";

const WinScreen = observer(() => {
  const gameStore = useStore().gameStore;

  const handleClick = () => {
    gameStore.nextGame();
  };

  return (
    <>
      {gameStore.isWin && (
        <div className="fixed top-0 left-0 z-10 flex items-center justify-center w-screen h-screen bg-black bg-opacity-30">
          <div className=" w-[200px] sm:w-[700px] p-10 rounded-lg text-black bg-gray-200 ">
            <div className="">Решено!</div>
            <div className="">{gameStore.defaultMsg}</div>
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
