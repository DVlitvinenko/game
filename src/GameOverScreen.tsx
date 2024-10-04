import { observer } from "mobx-react-lite";
import { useStore } from "./StoreContext";
import Button from "./components/Button";
import Cell from "./components/Cell";
import { playSoundRightClick } from "./sounds";

const GameOverScreen = observer(() => {
  const gameStore = useStore().gameStore;

  const handleClick = () => {
    playSoundRightClick();
    gameStore.restartGame();
  };

  return (
    <>
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
    </>
  );
});
export default GameOverScreen;
