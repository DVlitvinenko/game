import { makeAutoObservable } from "mobx";
import GameStore from "./GameStore";

class MainStore {
  gameStore: GameStore;

  constructor() {
    this.gameStore = new GameStore(); // Инициализируем GameStore
    makeAutoObservable(this); // Делаем все свойства наблюдаемыми
  }
}

export default MainStore;
