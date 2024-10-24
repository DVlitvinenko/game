export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Мока́ть CSS-файлы
    "\\.(jpg|jpeg|png|gif|mp3|wav)$": "<rootDir>/__mocks__/fileMock.js", // Мока́ть медиафайлы
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Преобразование TypeScript
    "^.+\\.(js|jsx)$": "babel-jest", // Преобразование JavaScript
  },
};
