import { observer } from "mobx-react-lite";
import "./App.css";
import Game from "./Game";
import SelectDifficulty from "./SelectDifficulty";
import { useStore } from "./StoreContext";
import WinScreen from "./WinScreen";
import Header from "./Header";
import GameOverScreen from "./GameOverScreen";
import { useEffect } from "react";
import AnimatedModal from "./AnimatedModal";

const App = observer(() => {
  const gameStore = useStore().gameStore;

  useEffect(() => {
    gameStore.loadFinishedIdsFromLocal();
  }, []);

  return (
    <>
      <div className="text-xl ">
        {gameStore.isDifficultSelected && <Header />}
        {!gameStore.isDifficultSelected && <SelectDifficulty />}
        {gameStore.isDifficultSelected && <Game />}
        <AnimatedModal
          onClose={() => gameStore.nextGame()}
          isVisible={gameStore.isWin}
        >
          <WinScreen />
        </AnimatedModal>
        <AnimatedModal
          onClose={() => gameStore.restartGame()}
          isVisible={gameStore.isGameOver}
        >
          <GameOverScreen />
        </AnimatedModal>
      </div>
    </>
  );
});

export default App;
