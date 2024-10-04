import { HTMLAttributes } from "react";
import Cell from "./Cell";
import { observer } from "mobx-react-lite";
import { checkMatch, isSymbol } from "../utils";
import { useStore } from "../StoreContext";

interface LetterCell extends HTMLAttributes<HTMLElement> {
  item: string;
  index: number;
  questString: string[];
}

const LetterCell = observer(({ item, index, questString }: LetterCell) => {
  const gameStore = useStore().gameStore;

  const isMatched = checkMatch(item, questString[index]);
  const isSymbolLetter = isSymbol(item);

  const handleClick = () => {
    if (!isMatched && !isSymbolLetter) {
      gameStore.setSelectedSymbolId(index);
    }
  };

  return (
    <div>
      {isMatched && !isSymbolLetter && <Cell type="green">{item}</Cell>}
      {isSymbolLetter && (
        <Cell
          type="inherit"
          className="flex items-center justify-center w-12 h-12 p-1"
        >
          {item}
        </Cell>
      )}
      {!isMatched && !isSymbolLetter && (
        <Cell
          type="red"
          onClick={handleClick}
          className="flex items-center justify-center w-12 h-12 p-1 font-bold text-center border-2 border-red-600 cursor-pointer"
        >
          {item}
        </Cell>
      )}
    </div>
  );
});

export default LetterCell;
