import { observer } from "mobx-react-lite";
import { useStore } from "./StoreContext";
import { playSoundClick, playSoundGameOver } from "./sounds";
import Header from "./Header";

const HeaderContainer = observer(() => {
  const gameStore = useStore().gameStore;
  const { hitScores, isDifficultSelected } = gameStore;

  const onBack = () => {
    gameStore.setIsDifficultSelected(false);
    playSoundClick();
  };

  const onRestart = () => {
    gameStore.restartGame();
    playSoundGameOver();
  };

  return (
    <>
      {isDifficultSelected && (
        <Header
          hitScores={hitScores}
          onClickBack={onBack}
          onClickRestart={onRestart}
        />
      )}
    </>
  );
});
export default HeaderContainer;
