import React from "react";
import { BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "hooks/useStore";
import { Navbar } from "components/Navbar";
import { Categories } from "modules/Categories";
import { Widgets } from "modules/Widgets";
import { Loader } from "components/Loader";
import { store } from "./stores/RootStore";
import styles from "./styles.module.scss";

export const App = observer(() => {
    const { categoriesStore, gamesStore, widgetsStore } = store;

    const isLoading = categoriesStore.isLoading || widgetsStore.isLoading || gamesStore.isLoading;

    return (
        <RootStoreContext.Provider value={store}>
            <BrowserRouter>
                <main className={styles.App}>
                    {isLoading
                        ? <Loader />
                        : (
                            <>
                                <Navbar className={styles.Header} categories={store.categoriesStore.categories} />
                                <Widgets className={styles.Widgets} />
                                <Categories className={styles.View} />
                            </>
                        )}
                </main>
            </BrowserRouter>
        </RootStoreContext.Provider>
    );
});
