import { makeAutoObservable } from "mobx";
import content from "./assets/json/content.json";
import { shifrateString } from "./utils";

class GameStore {
  percentToShifr: number = 0;
  msgId: number = 0;
  finishedIds: number[] = [];
  defaultMsg: string = "";
  msg: string = "";
  isWin: boolean = false;
  contentOver: boolean = false;
  selectedSymbolId: number = -1;
  isDifficultSelected: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setPercentToShifr(newPercent: number) {
    this.percentToShifr = newPercent;
  }

  setMsgId(id: number) {
    this.msgId = id;
  }

  setFinishedIds(id: number) {
    this.finishedIds = [...this.finishedIds, id];
  }

  setDefaultMsg(string: string) {
    this.defaultMsg = string;
  }
  setMsg(string: string) {
    this.msg = string;
  }

  setSelectedSymbolId(id: number) {
    this.selectedSymbolId = id;
  }

  setIsDifficultSelected(value: boolean) {
    this.isDifficultSelected = value;
  }

  startGame() {
    const findMsg = content
      .find((item) => item.id === this.msgId)!
      .message.toLowerCase();
    this.setMsg(shifrateString(findMsg, this.percentToShifr));
    this.setDefaultMsg(findMsg);
  }

  checkWin() {
    if (this.msg === this.defaultMsg) {
      this.isWin = true;
    }
  }

  saveResult = () => {
    if (this.msgId) {
      this.setFinishedIds(this.msgId);
    }
  };

  nextGame = () => {
    this.saveResult();
    const id = this.msgId + 1;
    if (id < content.length - 1) {
      this.setMsgId(id);
    } else {
      this.contentOver = true;
    }
    this.isWin = false;
    this.startGame();
  };

  shifrateSymbol = (oldSymbol: string, newSymbol: string) => {
    this.setMsg(this.msg.replace(new RegExp(oldSymbol, "g"), newSymbol));
  };
}

export default GameStore;
