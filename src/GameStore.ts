import { makeAutoObservable } from "mobx";
import content from "../public/content.json";
import { isCyrillic, shifrateString } from "./utils";
import { playSoundGameOver, playSoundWin } from "./sounds";

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
  numberOfMoves: number = 0;
  hitScores: number = 0;
  info:
    | { author: string; message: string; id: number; moves: number }
    | undefined = undefined;
  isGameOver: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setIsGameOver(value: boolean) {
    this.isGameOver = value;
  }

  incrementMoves() {
    this.numberOfMoves++;
  }

  resetMoves() {
    this.numberOfMoves = 0;
  }

  setHitScores() {
    this.hitScores = this.info?.moves! - this.numberOfMoves;
  }

  getInfo() {
    this.info = content.find((i) => i.id === this.msgId);
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

  setDefaultMsg() {
    this.defaultMsg = content
      .find((item) => item.id === this.msgId)!
      .message.toLowerCase();
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
    this.setDefaultMsg();
    this.setMsg(shifrateString(this.defaultMsg, this.percentToShifr));
    this.resetMoves();
    this.getInfo();
    this.setHitScores();
  }

  nextStep() {
    this.setSelectedSymbolId(-1);
    this.checkWin();
    if (!this.isWin) {
      this.incrementMoves();
      this.setHitScores();
      this.checkGameOver();
    }
  }

  checkGameOver() {
    if (this.hitScores <= 0) {
      this.setIsGameOver(true);
      playSoundGameOver();
    }
  }

  restartGame() {
    this.setIsGameOver(false);
    this.startGame();
  }

  checkWin() {
    if (this.msg === this.defaultMsg) {
      this.isWin = true;
      playSoundWin();
    }
  }

  saveResult = () => {
    this.setFinishedIds(this.msgId);
  };

  incrementId() {
    const id = this.msgId + 1;
    if (id < content.length - 1) {
      this.setMsgId(id);
    } else {
      this.contentOver = true;
    }
  }

  saveFinishedIdsToLocal() {
    localStorage.setItem("finishedIds", JSON.stringify(this.finishedIds));
  }

  loadFinishedIdsFromLocal() {
    const finishedIds = localStorage.getItem("finishedIds");
    if (finishedIds) {
      this.finishedIds = JSON.parse(finishedIds);

      this.setMsgId(this.finishedIds[this.finishedIds.length - 1] + 1);
    }
  }

  nextGame = () => {
    this.saveResult();
    this.incrementId();
    this.isWin = false;
    this.startGame();
    this.saveFinishedIdsToLocal();
  };

  shifrateSymbol = (oldSymbol: string, newSymbol: string) => {
    if (isCyrillic(oldSymbol)) {
      const msgArray = this.msg.split("");
      const defaultMsgArray = this.defaultMsg.split("");

      for (let i = 0; i < msgArray.length; i++) {
        if (msgArray[i] === oldSymbol && defaultMsgArray[i] !== oldSymbol) {
          msgArray[i] = newSymbol;
        }
      }

      this.setMsg(msgArray.join(""));
    } else {
      this.setMsg(this.msg.replace(new RegExp(oldSymbol, "g"), newSymbol));
    }
  };
}

export default GameStore;
