import Cell from "./components/Cell";
import Button from "./components/Button";
import AnimatedModal from "./AnimatedModal";
import { useState } from "react";

interface SelectDifficultyTypes {
  onChange: (value: number) => void;
  onClear: () => void;
  isVisible: boolean;
}

const SelectDifficulty = ({
  onChange,
  isVisible = false,
  onClear,
}: SelectDifficultyTypes) => {
  const [isClearVisible, setIsClearVisible] = useState(false);

  const difficult = [
    { name: "легко", value: 20 },
    { name: "cредне", value: 50 },
    { name: "сложно", value: 80 },
    { name: "максимум", value: 100 },
  ];

  return (
    <>
      {isVisible && (
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="font-bold">Выберите уровень сложности</div>
          <div className="grid w-full max-w-sm grid-cols-2 gap-2 cursor-pointer">
            {difficult.map((item, i) => (
              <Cell
                type="green"
                onClick={() => onChange(item.value)}
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
                <Button
                  className="w-20"
                  onClick={() => {
                    setIsClearVisible(false);
                    onClear();
                  }}
                >
                  Да
                </Button>
                <Button
                  onClick={() => setIsClearVisible(false)}
                  className="w-20"
                >
                  Нет
                </Button>
              </div>
            </div>
          </AnimatedModal>
          <div className="fixed left-0 flex items-center justify-center w-full bottom-10">
            <Button onClick={() => setIsClearVisible(true)}>
              Сброс прогресса
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectDifficulty;
