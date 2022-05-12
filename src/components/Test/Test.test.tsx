import React from "react";
import { render, screen } from "@testing-library/react";
import { Test } from "./Test";

describe("Test", () => {
    it("should test", () => {
        render(<Test />);

        expect(screen.getByText("Hello World!")).toBeInTheDocument();
    });
});
