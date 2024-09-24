export const isSymbol = (char: string) => {
  return /[,. ]/.test(char);
};

export const isCyrillic = (char: string) => {
  return /[а-яёА-ЯЁ]/.test(char);
};

export const checkMatch = (one: string, second: string) => {
  return one === second;
};

export const ShakeLettersInString = (arrayString: string[]) => {
  for (let i = arrayString.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayString[i], arrayString[j]] = [arrayString[j], arrayString[i]];
  }
  return arrayString;
};

export const getUnikLettersFromString = (inputString: string) => {
  const uniqueCyrillicLetters = new Set();
  const lowerCaseString = inputString.toLowerCase();
  for (const char of lowerCaseString) {
    if (/[а-яёА-ЯЁ]/.test(char)) {
      uniqueCyrillicLetters.add(char);
    }
  }
  return Array.from(uniqueCyrillicLetters);
};

export const shifrateString = (inputString: string, percent: number) => {
  const uniqueCyrillicLetters = new Set();
  inputString.toLowerCase();
  for (const char of inputString) {
    if (/[а-яёА-ЯЁ]/.test(char)) {
      uniqueCyrillicLetters.add(char);
    }
  }

  const uniqueLettersArray = Array.from(uniqueCyrillicLetters);
  const totalUniqueLetters = uniqueLettersArray.length;

  const numberOfLettersToReplace = Math.ceil(
    (percent / 100) * totalUniqueLetters
  );

  let shifrLetters = [
    ..."1234567890", // цифры
    ..."你好世界", // Привет, мир
    ..."我爱你", // Я тебя люблю
    ..."学习", // Учиться
    ..."快乐", // Счастье
    ..."朋友", // Друзья
    ..."家", // Дом
    ..."生命", // Жизнь
    ..."时间", // Время
    ..."世界", // Мир
    ..."爱", // Любовь
    ..."希望", // Надежда
    ..."梦想", // Мечта
    ..."自由", // Свобода
    ..."幸福", // Счастье
    ..."勇气", // Мужество
    ..."智慧", // Мудрость
    ..."美丽", // Красота
    ..."和平", // Мир
    ..."快乐", // Радость
    ..."成功", // Успех
    ..."学习", // Учение
    ..."努力", // Упорство
    ..."未来", // Будущее
    ..."文化", // Культура
    ..."教育", // Образование
    ..."科学", // Наука
    ..."艺术", // Искусство
    ..."音乐", // Музыка
    ..."电影", // Фильм
    ..."书籍", // Книги
    ..."运动", // Спорт
    ..."旅行", // Путешествие
    ..."美食", // Вкусная еда
    ..."自然", // Природа
    ..."城市", // Город
    ..."社区", // Сообщество
    ..."家庭", // Семья
    ..."责任", // Ответственность
    ..."信任", // Доверие
    ..."友谊", // Дружба
    ..."快乐", // Радость
    ..."梦想", // Мечта
    ..."挑战", // Вызов
    ..."改变", // Изменение
    ..."成长", // Рост
    ..."希望", // Надежда
    ..."感恩", // Благодарность
    ..."幸福", // Счастье
    ..."爱心", // Забота
    ..."善良", // Доброта
    ..."勇敢", // Храбрость
    ..."坚持", // Упорство
    ..."努力", // Усердие
    ..."成功", // Успех
  ];

  shifrLetters = ShakeLettersInString(shifrLetters);

  let shifratedString = inputString;
  for (let index = 0; index < numberOfLettersToReplace; index++) {
    if (index < uniqueLettersArray.length && index < shifrLetters.length) {
      const cyrillicLetter = uniqueLettersArray[index];
      const latinLetter = shifrLetters[index];

      shifratedString = shifratedString.replace(
        new RegExp(cyrillicLetter as string, "g"),
        latinLetter
      );
    }
  }

  return shifratedString;
};
