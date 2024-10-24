import { observer } from "mobx-react-lite";
import { useStore } from "./StoreContext";
import { playSoundRightClick } from "./sounds";
import SelectDifficulty from "./SelectDifficulty";

const SelectDifficultyContainer = observer(() => {
  const gameStore = useStore().gameStore;
  const { isDifficultSelected } = gameStore;

  const onChange = (value: number) => {
    gameStore.setPercentToShifr(value);
    gameStore.setIsDifficultSelected(true);
    playSoundRightClick();
  };

  const onClear = () => {
    gameStore.clearFinishedIds();
    gameStore.saveFinishedIdsToLocal();
    gameStore.setMsgId(0);
  };

  return (
    <>
      <SelectDifficulty
        isVisible={!isDifficultSelected}
        onChange={onChange}
        onClear={onClear}
      />
    </>
  );
});

export default SelectDifficultyContainer;
