import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Home } from "screens/Home";

import styles from "./styles.module.scss";

export const App: React.FC = () => {
    return (
        <BrowserRouter>
            <main className={styles.app}>
                <Home />
            </main>
        </BrowserRouter>
    );
};
