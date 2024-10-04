import clickSound from "./assets/sounds/click.mp3";
import rightClickSound from "./assets/sounds/2.mp3";
import gameOverSound from "./assets/sounds/1.mp3";
import winSound from "./assets/sounds/3.mp3";
import errorSound from "./assets/sounds/4.mp3";

const audioContext = new (window.AudioContext ||
  (window as any).webkitAudioContext)();

const loadSound = async (url: string): Promise<AudioBuffer> => {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  return audioContext.decodeAudioData(arrayBuffer);
};

const sounds: { [key: string]: AudioBuffer } = {};

const loadSounds = async () => {
  sounds.click = await loadSound(clickSound);
  sounds.rightClick = await loadSound(rightClickSound);
  sounds.gameOver = await loadSound(gameOverSound);
  sounds.win = await loadSound(winSound);
  sounds.error = await loadSound(errorSound);
};

loadSounds();

export const playSound = (soundName: string) => {
  const soundBuffer = sounds[soundName];
  if (soundBuffer) {
    const source = audioContext.createBufferSource();
    source.buffer = soundBuffer;
    source.connect(audioContext.destination);
    source.start(0);
  }
};

export const playSoundClick = () => playSound("click");
export const playSoundRightClick = () => playSound("rightClick");
export const playSoundGameOver = () => playSound("gameOver");
export const playSoundWin = () => playSound("win");
export const playSoundError = () => playSound("error");
