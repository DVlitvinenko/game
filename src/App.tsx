import { observer } from "mobx-react-lite";
import "./App.css";
import { useStore } from "./StoreContext";
import { useEffect } from "react";
import InfoScreenContainer from "./InfoScreenContainer";
import HeaderContainer from "./HeaderContainer";
import SelectDifficultyContainer from "./SelectDifficultyContainer";
import GameContainer from "./GameContainer";

const App = observer(() => {
  const gameStore = useStore().gameStore;

  useEffect(() => {
    gameStore.loadFinishedIdsFromLocal();
  }, []);

  return (
    <>
      <div className="text-xl ">
        <HeaderContainer />
        <SelectDifficultyContainer />
        {gameStore.isDifficultSelected && <GameContainer />}
        <InfoScreenContainer />
      </div>
    </>
  );
});

export default App;
