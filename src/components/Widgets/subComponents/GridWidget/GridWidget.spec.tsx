/* eslint-disable @typescript-eslint/require-await */
import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { GridWidgetOption } from "types";
import { GridWidget } from "./GridWidget";

function createOption(title: string): GridWidgetOption {
    return {
        title,
        size: "md",
    };
}

describe("GridWidget", () => {
    it("should render", () => {
        const options: GridWidgetOption[] = [];
        const handler = jest.fn();
        const activeGrid = "";

        render(<GridWidget handler={handler} activeGrid={activeGrid} options={options} />);

        expect(screen.queryByTestId("grid-widget")).toBeInTheDocument();
    });

    it("should render option", () => {
        const title = "testTitle";
        const options = [createOption(title)];
        const handler = jest.fn();
        const activeGrid = "";

        render(<GridWidget handler={handler} activeGrid={activeGrid} options={options} />);

        expect(screen.queryByTestId(title)).toBeInTheDocument();
    });

    it("should call handler on click", async () => {
        const title = "testTitle";
        const options = [createOption(title)];
        const handler = jest.fn();
        const activeGrid = "";

        render(<GridWidget handler={handler} activeGrid={activeGrid} options={options} />);
        const option = screen.getByTestId(title);

        await act(async () => {
            fireEvent.click(option);
        });

        expect(handler).toBeCalledTimes(1);
    });
});
