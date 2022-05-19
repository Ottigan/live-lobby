import * as React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "hooks/useStore";
import { Navbar } from "components/Navbar";
import { ObRoulettes } from "modules/ObRoulettes";
import { ObBlackjacks } from "modules/ObBlackjacks";
import { store } from "./stores/RootStore";
import styles from "./styles.module.scss";

export const App = observer(() => {
    const { categories } = store;

    return (
        <RootStoreContext.Provider value={store}>
            <BrowserRouter basename="">
                <main className={`${styles.App}`}>
                    <Navbar className={`${styles.Header}`} categories={categories} />
                    <Routes>
                        <Route path="/roulette" element={<ObRoulettes className={`${styles.View}`} />} />
                        <Route path="/blackjack" element={<ObBlackjacks className={`${styles.View}`} />} />
                        <Route path="/*" element={<Navigate to="/roulette" replace={true} />} />
                    </Routes>
                </main>
            </BrowserRouter>
        </RootStoreContext.Provider>
    );
});
