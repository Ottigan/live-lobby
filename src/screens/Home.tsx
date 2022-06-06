import { Loader } from "components/Loader";
import { useStore } from "hooks/useStore";
import { observer } from "mobx-react-lite";
import { Categories } from "modules/Categories";
import { Navbar } from "modules/Navbar";
import { Widgets } from "modules/Widgets";
import React from "react";

export const Home = observer(() => {
    const { categoriesStore, gamesStore, widgetsStore } = useStore();

    const isLoading = categoriesStore.isLoading || widgetsStore.isLoading || gamesStore.isLoading;

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <Navbar />
            <Widgets />
            <Categories />
        </>
    );
});
