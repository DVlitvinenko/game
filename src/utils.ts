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
    "你", // You
    "好", // Good
    "世", // World
    "界", // Boundary
    "我", // I
    "爱", // Love
    "你", // You
    "学", // Study
    "习", // Practice
    "快", // Happy
    "乐", // Joy
    "朋", // Friend
    "友", // Friend
    "家", // Home
    "生", // Life
    "命", // Fate
    "时", // Time
    "间", // Interval
    "希", // Hope
    "望", // Hope
    "梦", // Dream
    "想", // Think
    "自", // Self
    "由", // Freedom
    "幸", // Happiness
    "福", // Blessing
    "勇", // Brave
    "气", // Energy
    "智", // Wisdom
    "慧", // Intelligence
    "美", // Beauty
    "丽", // Beautiful
    "和", // Harmony
    "平", // Peace
    "成", // Achieve
    "功", // Success
    "努", // Strive
    "力", // Power
    "未", // Not yet
    "来", // Come
    "文", // Culture
    "化", // Change
    "教", // Teach
    "育", // Educate
    "科", // Science
    "学", // Study
    "艺", // Art
    "术", // Technique
    "音", // Sound
    "乐", // Music
    "影", // Shadow
    "片", // Film
    "书", // Book
    "籍", // Volume
    "运", // Movement
    "动", // Move
    "旅", // Travel
    "行", // Walk
    "食", // Food
    "自然", // Nature
    "城", // City
    "市", // Market
    "区", // District
    "家", // Family
    "庭", // Court
    "责", // Responsibility
    "任", // Duty
    "信", // Trust
    "任", // Trust
    "友", // Friend
    "谊", // Friendship
    "挑", // Challenge
    "战", // War
    "改", // Change
    "变", // Change
    "长", // Long
    "成长", // Growth
    "感", // Feel
    "恩", // Grace
    "善", // Good
    "良", // Good
    "勇", // Brave
    "敢", // Dare
    "坚", // Firm
    "持", // Hold
    "成", // Achieve
    "功", // Success
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
