import { AppStoreContext } from "index";
import React from "react";
import { StoreName, Stores } from "types";

export function useStore<T extends StoreName>(name: T): Stores[T] {
    const store = React.useContext(AppStoreContext)?.stores[name];

    if (!store) {
        throw Error("Store was not initialized!");
    }

    return store;
}
