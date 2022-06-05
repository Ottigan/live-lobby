import React from "react";
import { act, render, screen } from "@testing-library/react";
import { Avatar } from "./index";

jest.spyOn(global, "setInterval");
jest.spyOn(global, "clearInterval");

// helper function to improve readability
function actAdvanceTimersByTime(msToRun: number): void {
    act(() => {
        jest.advanceTimersByTime(msToRun);
    });
}

describe("Avatar", () => {
    beforeEach(() => {
        jest.useFakeTimers();
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.useRealTimers();
        jest.clearAllMocks();
    });

    it("should render", () => {
        const gameImageDivRef = { current: null };
        const online = true;
        const opensAt = "";

        render(<Avatar gameImageDivRef={gameImageDivRef} online={online} opensAt={opensAt} />);

        expect(screen.queryByTestId("game-avatar")).toBeInTheDocument();
    });

    it("should render overlay if table is offline", () => {
        const gameImageDivRef = { current: null };
        const opensAt = "";

        const { rerender } = render(<Avatar gameImageDivRef={gameImageDivRef} online={true} opensAt={opensAt} />);
        expect(screen.queryByTestId("game-avatar-overlay")).not.toBeInTheDocument();

        rerender(<Avatar gameImageDivRef={gameImageDivRef} online={false} opensAt={opensAt} />);
        expect(screen.queryByTestId("game-avatar-overlay")).toBeInTheDocument();
    });

    it("should update overlay countdown every second", () => {
        const gameImageDivRef = { current: null };
        const date = new Date();
        const hours = date.getHours();
        date.setHours(hours + 1); // Table opens in 1h
        const opensAt = date.toISOString();
        const online = false;

        render(<Avatar gameImageDivRef={gameImageDivRef} online={online} opensAt={opensAt} />);
        expect(screen.getByTestId("game-avatar-countdown").innerHTML).toMatch("01:00:00");

        actAdvanceTimersByTime(1000);
        expect(screen.getByTestId("game-avatar-countdown").innerHTML).toMatch("00:59:59");
    });

    it("should remove countdown after it reaches 00:00:01", () => {
        const gameImageDivRef = { current: null };
        const date = new Date();
        const seconds = date.getSeconds();
        date.setSeconds(seconds + 10); // Table opens in 10 seconds
        const opensAt = date.toISOString();
        const online = false;

        render(<Avatar gameImageDivRef={gameImageDivRef} online={online} opensAt={opensAt} />);

        actAdvanceTimersByTime(9000);
        expect(screen.queryByTestId("game-avatar-countdown")).toBeInTheDocument();

        actAdvanceTimersByTime(1000);
        expect(screen.queryByTestId("game-avatar-countdown")).not.toBeInTheDocument();
    });
});
