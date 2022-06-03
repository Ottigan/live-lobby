import React from "react";
import { BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "hooks/useStore";
import { Home } from "modules/Home";
import { store } from "./stores/RootStore";
import styles from "./styles.module.scss";

export const App = observer(() => {
    return (
        <RootStoreContext.Provider value={store}>
            <BrowserRouter basename={process.env.BASENAME}>
                <main className={styles.app}>
                    <Home />
                </main>
            </BrowserRouter>
        </RootStoreContext.Provider>
    );
});
