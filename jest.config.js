/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
        "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js",
        "\\.svg": "<rootDir>/__mocks__/svg.js",
        "^components(.*)$": "<rootDir>/src/components/$1",
        "^utils(.*)$": "<rootDir>/src/utils/$1",
        "^views(.*)$": "<rootDir>/src/views/$1",
    },
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
