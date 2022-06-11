import React from "react";
import { render, screen } from "@testing-library/react";
import { Footer } from "./index";

describe("Footer", () => {
    it("should render", () => {
        const name = "Table";
        const online = true;
        const players = 13;
        const language = "uk";

        render(<Footer name={name} players={players} language={language} online={online} />);

        expect(screen.getByTestId("game-footer-name").textContent).toMatch(new RegExp(name));
        expect(screen.getByTestId("game-footer-players").textContent).toMatch(String(players));
    });

    it("should not render player count for offline tables", () => {
        const name = "Table";
        const online = false;
        const players = 13;
        const language = "uk";

        render(<Footer name={name} players={players} language={language} online={online} />);

        expect(screen.queryByTestId("game-footer-players")).not.toBeInTheDocument();
    });
});
