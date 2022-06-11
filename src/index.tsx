import * as React from "react";
import { createRoot } from "react-dom/client";
import { AppContext, ServiceName, Services, StoreName, Stores } from "types";
import { LobbyTransport } from "transports";
import * as globalStores from "./stores";
import * as globalServices from "./services";
import { App } from "./App";

const stores = (Object.keys(globalStores)).reduce((acc, key) => {
    const name = key as StoreName;
    const store = new globalStores[name]();

    return {
        ...acc,
        [name]: store,
    };
}, {} as Stores);

const transport = new LobbyTransport(process.env.WEBSOCKET);

const services = Object.keys(globalServices).reduce((acc, key) => {
    const name = key as ServiceName;
    const service = new globalServices[name](transport, stores);

    return {
        ...acc,
        [name]: service,
    };
}, {} as Services);

const value: AppContext = {
    stores,
    services,
};

export const AppStoreContext = React.createContext<AppContext | null>(null);

createRoot((document.getElementById("root") as HTMLDivElement)).render(((): React.ReactNode => {
    return (
        <React.StrictMode>
            <AppStoreContext.Provider value={value}>
                <App />
            </AppStoreContext.Provider>
        </React.StrictMode>
    );
})());
