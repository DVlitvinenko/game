import Cell from "./components/Cell";
import LetterCell from "./components/LetterCell";
import AnimatedModal from "./AnimatedModal";

interface GameTypes {
  shifrArray: string[];
  selectedSymbolId: number;
  onSymbolSelect: (id: number) => void;
  author: string;
  onLetterChose: (letter: string) => void;
  lettersToSelect: string[];
  questString: string[];
}

const Game = ({
  shifrArray,
  selectedSymbolId,
  onSymbolSelect,
  author,
  onLetterChose,
  lettersToSelect,
  questString,
}: GameTypes) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex text-3xl items-center max-w-[800px] pt-16 gap-y-2 gap-x-1 w-full justify-center flex-wrap">
        {shifrArray.map((item, i) => {
          let count = 0;
          const checkedItem = item === shifrArray[selectedSymbolId];
          if (!checkedItem) {
            count++;
          }
          return (
            <div className="" key={`${i}${count}`}>
              <LetterCell
                item={item}
                index={i}
                questString={questString}
                setSelectedSymbolId={(id) => onSymbolSelect(id)}
              />
            </div>
          );
        })}
        <AnimatedModal
          onClose={() => onSymbolSelect(-1)}
          isVisible={selectedSymbolId >= 0}
        >
          <div
            onClick={(e) => e.target === e.currentTarget && onSymbolSelect(-1)}
            className="fixed top-0 left-0 z-10 flex items-center justify-center w-screen h-screen p-4 "
          >
            <div className=" w-full  sm:w-[700px] p-10 rounded-lg text-black bg-gray-50 space-y-4">
              <p>
                Введите новое значение для символа "
                <span className="font-bold">
                  {shifrArray[selectedSymbolId]}
                </span>
                "
              </p>
              <div className="flex flex-wrap items-center justify-center gap-1">
                {lettersToSelect.map((letter, i) => (
                  <Cell
                    type="green"
                    onClick={() => {
                      onLetterChose(letter);
                    }}
                    className="cursor-pointer hover:bg-white"
                    key={`${letter as string}_${i}`}
                  >
                    {letter as string}
                  </Cell>
                ))}
              </div>
            </div>
          </div>
        </AnimatedModal>
      </div>
      <div className="w-full italic text-right">{author}</div>
    </div>
  );
};

export default Game;
