import { observer } from "mobx-react-lite";
import { useStore } from "./StoreContext";
import Button from "./components/Button";
import Cell from "./components/Cell";
import { playSoundRightClick } from "./sounds";
import CelebrationAnimation from "./CelebrationAnimation";
import { useState } from "react";

const WinScreen = observer(() => {
  const gameStore = useStore().gameStore;
  const [isCelebrationVisible, setIsCelebrationVisible] = useState(true);

  const handleClick = () => {
    setIsCelebrationVisible(false);
    gameStore.nextGame();
    playSoundRightClick();
  };

  return (
    <>
      <CelebrationAnimation isVisible={isCelebrationVisible} />
      <div className=" w-full sm:w-[700px] p-4 rounded-lg text-black bg-gray-200 space-y-4">
        <div className="">Решено!</div>
        <Cell type="green" className="h-auto">
          <div className="w-full px-2">
            <div className="">{gameStore.defaultMsg}</div>
            <div className="text-sm italic text-right">
              {gameStore.info?.author}
            </div>
          </div>
        </Cell>
        <div className="">
          <Button onClick={handleClick}>Дальше</Button>
        </div>
      </div>
    </>
  );
});
export default WinScreen;
