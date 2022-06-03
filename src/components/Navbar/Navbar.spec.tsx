import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./Navbar";

function getSampleCategories() {
    return [
        {
            name: "Blackjack",
            path: "blackjack",
            descriptor: "",
            gameIds: [],
            bgColor: "",
        },
    ];
}

describe("Navbar", () => {
    it("should render category", () => {
        const categories = getSampleCategories();

        const app = (
            <BrowserRouter>
                <Navbar categories={categories} />
            </BrowserRouter>
        );

        render(app);

        expect(screen.getByTestId("Blackjack")).toBeInTheDocument();
    });
});
