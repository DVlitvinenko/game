import { observer } from "mobx-react-lite";
import { useStore } from "./StoreContext";

const SelectDifficulty = observer(() => {
  const gameStore = useStore().gameStore;

  const handleChange = (value: number) => {
    gameStore.setPercentToShifr(value);
    gameStore.setIsDifficultSelected(true);
  };

  const difficult = [
    { name: "легко", value: 20 },
    { name: "cредне", value: 50 },
    { name: "сложно", value: 80 },
    { name: "максимум", value: 100 },
  ];

  return (
    <div className="flex flex-col space-y-2 ">
      <div className="">Выберите уровень сложности</div>
      <div className="flex gap-2">
        {difficult.map((item, i) => (
          <div
            onClick={() => handleChange(item.value)}
            className="p-2 uppercase transition-colors border-2 border-green-500 cursor-pointer bg-slate-200 hover:bg-slate-50"
            key={`${item.value}_${i}`}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
});

export default SelectDifficulty;
