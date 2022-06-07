/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.ts",
        "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.ts",
        "\\.svg": "<rootDir>/__mocks__/svg.ts",
        "^stores/RootStore": "<rootDir>/__mocks__/RootStore",
        "^db(.*)$": "<rootDir>/src/db/$1",
        "^types(.*)$": "<rootDir>/src/types.ts",
        "^assets(.*)$": "<rootDir>/src/assets/$1",
        "^components(.*)$": "<rootDir>/src/components/$1",
        "^services(.*)$": "<rootDir>/src/services/$1",
        "^stores(.*)$": "<rootDir>/src/stores/$1",
        "^utils(.*)$": "<rootDir>/src/utils/$1",
        "^views(.*)$": "<rootDir>/src/views/$1",
    },
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
