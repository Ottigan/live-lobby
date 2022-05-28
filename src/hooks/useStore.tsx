import React from "react";
import type { RootStore } from "../stores/RootStore";

export const RootStoreContext = React.createContext<RootStore | null>(null);

export function useStore(): RootStore {
    const store = React.useContext(RootStoreContext);

    if (!store) {
        throw Error("Store was not initialized!");
    }

    return store;
}
