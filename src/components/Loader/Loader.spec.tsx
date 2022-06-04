import React from "react";
import { screen, render } from "@testing-library/react";
import { Loader } from "./Loader";

describe("Loader", () => {
    it("should render", () => {
        render(<Loader />);

        expect(screen.getByTestId("loader")).toBeInTheDocument();
    });
});
