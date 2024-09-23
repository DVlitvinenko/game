import { useEffect, useRef, useState } from "react";
import content from "./assets/json/content.json";

function Game() {
  const [msgId, setMsgId] = useState<number | null>(null);
  const [finishedIds, setFinishedIds] = useState<number[]>([]);
  const [defaultMsg, setDefaultMsg] = useState("");
  const [msg, setMsg] = useState("");
  const [percentToShifr, setPercentToShifr] = useState(50);
  const [selectedSymbolId, setSelectedSymbolId] = useState(-1);

  useEffect(() => {
    setMsgId(updateId());
  }, []);

  useEffect(() => {
    if (msgId) {
      const findMsg = content
        .find((item) => item.id === msgId)!
        .message.toLowerCase();
      shifrate(findMsg, percentToShifr);
      setDefaultMsg(findMsg);
    }
  }, [msgId]);

  useEffect(() => {
    shifrate(defaultMsg, percentToShifr);
  }, [percentToShifr]);

  const shifrate = (inputString: string, percent: number) => {
    // Определяем уникальные буквы кириллицы
    const uniqueCyrillicLetters = new Set();
    inputString.toLowerCase();
    for (const char of inputString) {
      if (/[а-яёА-ЯЁ]/.test(char)) {
        uniqueCyrillicLetters.add(char);
      }
    }

    // Преобразуем Set в массив
    const uniqueLettersArray = Array.from(uniqueCyrillicLetters);
    const totalUniqueLetters = uniqueLettersArray.length;

    // Определяем количество букв, которые нужно заменить
    const numberOfLettersToReplace = Math.ceil(
      (percent / 100) * totalUniqueLetters
    );

    // Латинские буквы для замены
    let shifrLetters = "abcdefghijklmnopqrstuvwxyz123456789".split("");

    // Перемешиваем латинские буквы
    for (let i = shifrLetters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shifrLetters[i], shifrLetters[j]] = [shifrLetters[j], shifrLetters[i]];
    }

    // Заменяем символы
    let shifratedString = inputString; // Начинаем с оригинальной строки
    for (let index = 0; index < numberOfLettersToReplace; index++) {
      if (index < uniqueLettersArray.length && index < shifrLetters.length) {
        const cyrillicLetter = uniqueLettersArray[index];
        const latinLetter = shifrLetters[index];

        // Заменяем символ в строке
        shifratedString = shifratedString.replace(
          new RegExp(cyrillicLetter, "g"),
          latinLetter
        );
      }
    }

    // Устанавливаем зашифрованное сообщение
    setMsg(shifratedString);
  };

  const updateId = () => {
    if (msgId) {
      setFinishedIds([...finishedIds, msgId] as number[]);
    }

    return Math.floor(Math.random() * content.length);
  };

  const replay = () => {
    setMsgId(updateId());
  };

  const shifrateSymbol = (oldSymbol: string, newSymbol: string) => {
    setMsg(msg.replace(new RegExp(oldSymbol, "g"), newSymbol));
  };

  const isTrue = (now: string, old: string) => {
    return old === now && !isSymbol(now);
  };

  const isSymbol = (char: string) => {
    return /[,. ]/.test(char);
  };

  const isCyrillic = (char: string) => {
    return /[а-яёА-ЯЁ]/.test(char);
  };

  const shifrString = msg.split("");
  const questString = defaultMsg.split("");

  const getUnikLetters = (inputString: string) => {
    const uniqueCyrillicLetters = new Set();
    const lowerCaseString = inputString.toLowerCase();
    for (const char of lowerCaseString) {
      if (/[а-яёА-ЯЁ]/.test(char)) {
        uniqueCyrillicLetters.add(char);
      }
    }
    return Array.from(uniqueCyrillicLetters);
  };

  const lettersToSelect = getUnikLetters(defaultMsg).filter(
    (symbol) => !shifrString.includes(symbol as string)
  );

  const win = msg === defaultMsg;

  return (
    <>
      {win && (
        <button
          onClick={() => {
            replay();
          }}
        >
          Дальше
        </button>
      )}
      {/* <div className="flex items-center justify-center">
        <input
          max={100}
          min={0}
          step={10}
          type="number"
          value={percentToShifr}
          onChange={(e) => setPercentToShifr(Number(e.target.value))}
        />
      </div> */}
      <div className="flex items-center max-w-[800px] gap-y-2 gap-x-1 w-full justify-center flex-wrap">
        {shifrString.map((item, i) => (
          <div className={``} key={i}>
            {isTrue(item, questString[i]) && (
              <p
                className={`p-1 w-12 h-12 flex items-center justify-center border border-green-500`}
              >
                {item}
              </p>
            )}
            {isSymbol(item) && (
              <p className={`p-1  w-12 h-12 flex items-center justify-center `}>
                {item}
              </p>
            )}
            {!isTrue(item, questString[i]) && !isSymbol(item) && (
              <p
                onClick={() => {
                  setSelectedSymbolId(i);
                }}
                className={`p-1 cursor-pointer w-12 text-center h-12 flex items-center justify-center border-red-600 border-2`}
              >
                {item}
              </p>
            )}
          </div>
        ))}
        {selectedSymbolId >= 0 && (
          <div className="fixed left-0 w-screen h-screen flex items-center justify-center top-0 bg-black bg-opacity-30 z-10">
            <div className=" w-[200px] sm:w-[700px] p-10 rounded-lg text-black bg-gray-200 ">
              <p>
                Введите новое значение для символа "
                {shifrString[selectedSymbolId]}"
              </p>
              <div className="flex flex-wrap items-center justify-center gap-1">
                {lettersToSelect.map((letter) => (
                  <div
                    onClick={() => {
                      questString[selectedSymbolId] === letter &&
                        shifrateSymbol(
                          shifrString[selectedSymbolId],
                          letter as string
                        );
                      setSelectedSymbolId(-1);
                    }}
                    className="w-12 h-12 border cursor-pointer hover:bg-gray-400 border-black flex items-center justify-center"
                    key={letter as string}
                  >
                    {letter as string}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Game;
