/* eslint-disable @typescript-eslint/require-await */
import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { FilterWidgetOption } from "types";
import { FilterWidget } from "./FilterWidget";

function createOption(title: string): FilterWidgetOption {
    return {
        title,
        value: "",
        target: "",
    };
}

describe("FilterWidget", () => {
    it("should render", async () => {
        const title = "testFilterWidget";
        const options = [createOption(title)];
        const handler = jest.fn();

        render(<FilterWidget handler={handler} options={options} activeFilter="" />);

        expect(screen.getByTestId("filter-widget")).toBeInTheDocument();
    });

    it("should show/hide options on click", async () => {
        const title = "testFilterWidget";
        const options = [createOption(title)];
        const handler = jest.fn();

        render(<FilterWidget handler={handler} options={options} activeFilter="" />);
        const toggler = screen.getByTestId("filter-widget-toggler");

        const getOption = () => screen.queryByTestId(title);

        expect(getOption()).not.toBeInTheDocument();

        await act(async () => {
            fireEvent.click(toggler);
        });

        expect(getOption()).toBeInTheDocument();
    });

    it("should call handler on option click", async () => {
        const title = "testFilterWidget";
        const options = [createOption(title)];
        const handler = jest.fn();

        render(<FilterWidget handler={handler} options={options} activeFilter="" />);
        const toggler = screen.getByTestId("filter-widget-toggler");
        await act(async () => {
            fireEvent.click(toggler);
        });

        const option = screen.getByTestId(title);

        await act(async () => {
            fireEvent.click(option);
        });

        expect(handler).toBeCalledTimes(1);
    });
});
