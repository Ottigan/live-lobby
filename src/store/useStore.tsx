import React from "react";
import { Store } from "./Store";

export const StoreContext = React.createContext<Store | null>(null);

export function useStore(): Store {
    const store = React.useContext(StoreContext);

    if (!store) {
        throw Error("Store was not initialized!");
    }

    return store;
}
