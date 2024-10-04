import { observer } from "mobx-react-lite";
import { useStore } from "./StoreContext";
import Button from "./components/Button";
import { playSoundClick, playSoundGameOver } from "./sounds";

const Header = observer(() => {
  const gameStore = useStore().gameStore;

  return (
    <div className="fixed top-0 left-0 z-10 w-full h-12 px-4 py-1 bg-gray-100 shadow-xl">
      <div className="grid items-center grid-cols-3">
        <div className="">
          <Button
            className="text-sm "
            onClick={() => {
              gameStore.setIsDifficultSelected(false);
              playSoundClick();
            }}
          >
            Назад
          </Button>
        </div>
        <div className="col-start-2">
          <Button
            className="text-sm "
            onClick={() => {
              gameStore.restartGame();
              playSoundGameOver();
            }}
          >
            Заново
          </Button>
        </div>
        <div className="col-start-3">
          <div className="">Ходов: {gameStore.hitScores}</div>
        </div>
      </div>
    </div>
  );
});
export default Header;
