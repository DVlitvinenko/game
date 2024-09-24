import { observer } from "mobx-react-lite";
import "./App.css";
import Game from "./Game";
import SelectDifficulty from "./SelectDifficulty";
import { useStore } from "./StoreContext";
import WinScreen from "./WinScreen";
import Header from "./Header";
import GameOverScreen from "./GameOverScreen";

const App = observer(() => {
  const store = useStore();

  return (
    <>
      <div className="text-xl ">
        <Header />
        {!store.gameStore.isDifficultSelected && <SelectDifficulty />}
        {store.gameStore.isDifficultSelected && <Game />}
        <WinScreen />
        <GameOverScreen />
      </div>
    </>
  );
});

export default App;
