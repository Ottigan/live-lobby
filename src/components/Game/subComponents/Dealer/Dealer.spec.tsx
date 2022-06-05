import React from "react";
import { render, screen } from "@testing-library/react";
import { Dealer } from "./index";

describe("Dealer", () => {
    it("should render", () => {
        const dealer = "Dog";

        render(<Dealer dealer={dealer} />);
        expect(screen.queryByText(dealer)).toBeInTheDocument();
    });
});
