import React from "react";
import { BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "hooks/useStore";
import { Home } from "modules/Home";
import { Env } from "types";
import { store } from "./stores/RootStore";
import styles from "./styles.module.scss";

export const App = observer(() => {
    const basename = process.env.NODE_ENV === Env.Production
        ? process.env.GH_PAGES_BASENAME
        : process.env.LOCAL_BASENAME;

    return (
        <RootStoreContext.Provider value={store}>
            <BrowserRouter basename={String(basename)}>
                <main className={styles.app}>
                    <Home />
                </main>
            </BrowserRouter>
        </RootStoreContext.Provider>
    );
});
