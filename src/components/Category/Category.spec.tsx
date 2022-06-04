import React from "react";
import { render, screen } from "@testing-library/react";
import { Category } from "./Category";

describe("Category", () => {
    it("should render children", () => {
        const children = "children";
        const ref = { current: null };

        render(<Category containerRef={ref}>{children}</Category>);

        expect(screen.queryByText(children)).toBeInTheDocument();
    });
});
