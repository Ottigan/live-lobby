/* eslint-disable @typescript-eslint/require-await */
import React from "react";
import { render, screen } from "@testing-library/react";
import { SearchWidget } from "./SearchWidget";

function getWidget() {
    return screen.queryByTestId("search-widget") as HTMLInputElement;
}

describe("SearchWidget", () => {
    it("should render", () => {
        const handler = jest.fn();
        const value = "";

        render(<SearchWidget handler={handler} value={value} />);

        expect(getWidget()).toBeInTheDocument();
    });

    it("should display current value", async () => {
        const handler = jest.fn();
        const value = "";

        const { rerender } = render(<SearchWidget handler={handler} value={value} />);

        expect(getWidget().value).toMatch(value);

        const newValue = "New value";
        rerender(<SearchWidget handler={handler} value={newValue} />);

        expect(getWidget().value).toMatch(newValue);
    });
});
