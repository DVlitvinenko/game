import clickSound from "./assets/sounds/click.wav";
import gameOverSound from "./assets/sounds/1.wav";
import rightClick from "./assets/sounds/2.wav";
import winSound from "./assets/sounds/3.wav";
import errorSound from "./assets/sounds/4.wav";

export const playSoundClick = () => {
  const audio = new Audio(clickSound);
  audio.play();
};

export const playSoundRightClick = () => {
  const audio = new Audio(rightClick);
  audio.play();
};

export const playSoundGameOver = () => {
  const audio = new Audio(gameOverSound);
  audio.play();
};

export const playSoundWin = () => {
  const audio = new Audio(winSound);
  audio.play();
};

export const playSoundError = () => {
  const audio = new Audio(errorSound);
  audio.play();
};
