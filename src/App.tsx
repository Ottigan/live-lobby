import * as React from "react";
import { observer } from "mobx-react-lite";
import { StoreContext } from "store/useStore";
import { Navbar } from "components/Navbar";
import { Roulette } from "views/Roulette";
import { store } from "./store/Store";
import styles from "./styles.module.scss";

export const App = observer(() => {
    return (
        <StoreContext.Provider value={store}>
            <div className={`${styles.App}`}>
                <Navbar className={`${styles.Header}`} />
                <Roulette className={`${styles.View}`} />
            </div>
        </StoreContext.Provider>
    );
});
