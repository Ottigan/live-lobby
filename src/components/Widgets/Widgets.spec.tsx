import React from "react";
import { render, screen } from "@testing-library/react";
import { Widgets } from "./Widgets";

describe("Widgets", () => {
    it("should render children", () => {
        const children = "children";

        render(<Widgets>{children}</Widgets>);

        expect(screen.queryByText(children)).toBeInTheDocument();
    });
});
