import { observer } from "mobx-react-lite";
import { useStore } from "./StoreContext";
import Cell from "./components/Cell";
import { playSoundRightClick } from "./sounds";
import Button from "./components/Button";
import AnimatedModal from "./AnimatedModal";
import { useState } from "react";

const SelectDifficulty = observer(() => {
  const gameStore = useStore().gameStore;
  const [isClearVisible, setIsClearVisible] = useState(false);

  const handleChange = (value: number) => {
    gameStore.setPercentToShifr(value);
    gameStore.setIsDifficultSelected(true);
    playSoundRightClick();
  };

  const handleLvlClear = () => {
    gameStore.clearFinishedIds();
    gameStore.saveFinishedIdsToLocal();
    gameStore.setMsgId(0);
    setIsClearVisible(false);
  };

  const difficult = [
    { name: "легко", value: 20 },
    { name: "cредне", value: 50 },
    { name: "сложно", value: 80 },
    { name: "максимум", value: 100 },
  ];

  return (
    <div className="flex flex-col space-y-2 ">
      <div className="font-bold">Выберите уровень сложности</div>
      <div className="grid grid-cols-2 gap-2 cursor-pointer">
        {difficult.map((item, i) => (
          <Cell
            type="green"
            onClick={() => handleChange(item.value)}
            className="font-semibold hover:bg-slate-50"
            key={`${item.value}_${i}`}
          >
            {item.name}
          </Cell>
        ))}
      </div>
      <AnimatedModal
        isVisible={isClearVisible}
        onClose={() => setIsClearVisible(false)}
      >
        <div className="space-y-2">
          <div className="">
            Вы уверены что хотите сбросить прогресс уровней?
          </div>
          <div className="space-x-4">
            <Button onClick={handleLvlClear}>Да</Button>
            <Button onClick={() => setIsClearVisible(false)}>Нет</Button>
          </div>
        </div>
      </AnimatedModal>
      <div className="fixed left-0 w-full bottom-10">
        <Button onClick={() => setIsClearVisible(true)}>Сброс прогресса</Button>
      </div>
    </div>
  );
});

export default SelectDifficulty;
