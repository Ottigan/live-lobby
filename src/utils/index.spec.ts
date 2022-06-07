import { getDateDiff, getRandomMomentInNext24h } from "utils";

describe("Utils", () => {
    beforeEach(() => {
        jest.useFakeTimers();
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.useRealTimers();
        jest.clearAllMocks();
    });

    test("getDateDiff", () => {
        const to = new Date();
        to.setHours(to.getHours() + 1);

        expect(getDateDiff(new Date(), to)).toMatch("01:00:00");

        jest.advanceTimersByTime(1000 * 60 * 10); // advance by 10min
        expect(getDateDiff(new Date(), to)).toMatch("00:50:00");

        jest.advanceTimersByTime(1000 * 60 * 49 + 1000 * 59); // advance by 49 minutes 59 secconds
        expect(getDateDiff(new Date(), to)).toMatch("00:00:01");

        jest.advanceTimersByTime(1000);
        expect(getDateDiff(new Date(), to)).toBeNull();
    });

    test("getRandomMomentInNext24h should work", () => {
        const now = new Date();
        now.setDate(now.getDate() + 1);

        jest.spyOn(Math, "random").mockReturnValue(0.5);
        const nowPlus12h = getRandomMomentInNext24h();
        expect(nowPlus12h).not.toMatch(now.toISOString());

        jest.spyOn(Math, "random").mockReturnValue(1);
        const nowPlus24h = getRandomMomentInNext24h();
        expect(nowPlus24h).toMatch(now.toISOString());
    });
});
