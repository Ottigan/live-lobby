import { AppStoreContext } from "index";
import React from "react";
import { ServiceName, Services } from "types";

export function useService<T extends ServiceName>(name: T): Services[T] {
    const service = React.useContext(AppStoreContext)?.services[name];

    if (!service) {
        throw Error("Service was not initialized!");
    }

    return service;
}
