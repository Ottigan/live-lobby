import { Loader } from "components/Loader";
import { Categories } from "modules/Categories";
import { Navbar } from "modules/Navbar";
import { Widgets } from "modules/Widgets";
import React from "react";

interface HomeProps {
    isLoading: boolean;
}

export const Home: React.FC<HomeProps> = ({ isLoading }) => {
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
};
