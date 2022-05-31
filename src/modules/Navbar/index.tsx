import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "hooks/useStore";
import { Navbar as NavbarComponent } from "components/Navbar";

export const Navbar = observer(() => {
    const { categoriesStore: { categories } } = useStore();

    return <NavbarComponent categories={categories} />;
});
