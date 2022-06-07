import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "hooks/useStore";
import { Home } from "screens/Home";
import { RootStore } from "./stores/RootStore";
import styles from "./styles.module.scss";

const store = new RootStore();

export const App = observer(() => {
    const { categoriesService, categoriesStore, gamesService, gamesStore, widgetsService, widgetsStore } = store;

    useEffect(() => {
        categoriesService.getCategories()
            .catch((err) => console.error(err))
            .finally(() => { categoriesStore.isLoading = false; });

        function getGames() {
            gamesService.getGames()
                .catch((err) => console.error(err))
                .finally(() => { gamesStore.isLoading = false; });
        }

        getGames();

        const getGamesInterval = setInterval(getGames, 1000);

        widgetsService.getWidgets()
            .catch((err) => console.error(err))
            .finally(() => { widgetsStore.isLoading = false; });

        return () => clearInterval(getGamesInterval);
    }, [categoriesService, categoriesStore, gamesService, gamesStore, widgetsService, widgetsStore]);

    return (
        <RootStoreContext.Provider value={store}>
            <BrowserRouter>
                <main className={styles.app}>
                    <Home />
                </main>
            </BrowserRouter>
        </RootStoreContext.Provider>
    );
});
