export const RootStore = jest.fn(() => {
    return {
        categoriesStore: jest.fn(),
        categoriesService: jest.fn(),
        gamesStore: jest.fn(),
        widgetsStore: jest.fn(),
        widgetsService: jest.fn(),
        uiStore: jest.fn(),
    };
});
