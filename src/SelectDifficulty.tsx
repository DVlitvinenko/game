import { observer } from "mobx-react-lite";
import { useStore } from "./StoreContext";
import Cell from "./components/Cell";
import { playSoundRightClick } from "./sounds";

const SelectDifficulty = observer(() => {
  const gameStore = useStore().gameStore;

  const handleChange = (value: number) => {
    gameStore.setPercentToShifr(value);
    gameStore.setIsDifficultSelected(true);
    playSoundRightClick();
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
    </div>
  );
});

export default SelectDifficulty;
