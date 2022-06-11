/* eslint-disable no-proto */
import { UiStore } from "./UiStore";

describe("UiStore", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should construct with correct windowDimensions", () => {
        const windowHeight = 937;
        const windowWidth = 1920;

        const windowDimensions = {
            height: windowHeight,
            width: windowWidth,
        };

        window.innerHeight = windowHeight;
        window.innerWidth = windowWidth;

        const store = new UiStore();

        expect(store.windowDimensions).toEqual(windowDimensions);
    });

    it("should update windowDimensions on resize", () => {
        const store = new UiStore();

        const minimizedWindowHeight = 600;
        const minimizedWindowWidth = 1500;

        const minimizedWindowDimensions = {
            height: minimizedWindowHeight,
            width: minimizedWindowWidth,
        };

        window.innerHeight = minimizedWindowHeight;
        window.innerWidth = minimizedWindowWidth;

        expect(store.windowDimensions).not.toEqual(minimizedWindowDimensions);

        window.dispatchEvent(new Event("resize"));

        expect(store.windowDimensions).toEqual(minimizedWindowDimensions);
    });

    it("should not assign invalid gridSize from localStorage", () => {
        const invalidGridSize = "invalidGridSize";
        const getItem = jest.fn(() => invalidGridSize);
        (window.localStorage.__proto__ as Storage).getItem = getItem;

        const store = new UiStore();

        expect(getItem).toHaveBeenCalled();
        expect(store.gridSize).not.toMatch(invalidGridSize);
    });

    it("should assign valid gridSize from localStorage", () => {
        const validGridSize = "lg";
        const getItem = jest.fn(() => validGridSize);
        (window.localStorage.__proto__ as Storage).getItem = getItem;

        const store = new UiStore();

        expect(getItem).toHaveBeenCalled();
        expect(store.gridSize).toMatch(validGridSize);
    });

    test("setGridSize should work", () => {
        const setItem = jest.fn();
        (window.localStorage.__proto__ as Storage).setItem = setItem;

        const store = new UiStore();

        const lgGridSize = "lg";
        store.setGridSize(lgGridSize);
        expect(setItem).toBeCalledWith("gridSize", lgGridSize);
        expect(store.gridSize).toMatch(lgGridSize);

        const smGridSize = "sm";
        store.setGridSize(smGridSize);
        expect(setItem).toBeCalledWith("gridSize", smGridSize);
        expect(store.gridSize).toMatch(smGridSize);
    });
});
