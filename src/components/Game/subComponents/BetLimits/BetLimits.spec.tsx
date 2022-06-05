import React from "react";
import { render, screen } from "@testing-library/react";
import { BetLimits } from "./index";

describe("BetLimits", () => {
    it("should render", () => {
        const currency = "$";
        const min = 1;
        const max = 10;

        render(<BetLimits currency={currency} min={min} max={max} />);

        expect(screen.queryByTestId("game-bet-limits")?.textContent).toMatch("$ 1 - 10");
    });
});
