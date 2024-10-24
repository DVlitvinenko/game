import { observer } from "mobx-react-lite";
import { useStore } from "./StoreContext";
import { playSoundRightClick } from "./sounds";
import InfoScreen from "./infoScreen";

const GameOverScreenContainer = observer(() => {
  const gameStore = useStore().gameStore;
  const { isWin, isGameOver, info } = gameStore;

  const handleClick = () => {
    playSoundRightClick();
    if (isWin) {
      return gameStore.nextGame();
    }
    gameStore.restartGame();
  };

  return (
    <InfoScreen
      isCelebrationVisible={isWin}
      infoText={isWin ? "Вы выиграли" : "Вы проиграли!"}
      buttonText={isWin ? "Далее" : "Заново"}
      subText={info?.author}
      isVisible={isGameOver || isWin}
      defaultMsg={info?.message}
      onClick={handleClick}
    />
  );
});
export default GameOverScreenContainer;
