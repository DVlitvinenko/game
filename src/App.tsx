import { observer } from "mobx-react-lite";
import "./App.css";
import Game from "./Game";
import SelectDifficulty from "./SelectDifficulty";
import { useStore } from "./StoreContext";
import WinScreen from "./WinScreen";

const App = observer(() => {
  const store = useStore();

  return (
    <>
      <div className="text-xl ">
        {!store.gameStore.isDifficultSelected && <SelectDifficulty />}
        {store.gameStore.isDifficultSelected && <Game />}
        <WinScreen />
      </div>
    </>
  );
});

export default App;
