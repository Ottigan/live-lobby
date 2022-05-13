import * as React from "react";
import { Test } from "components/Test";
import { observer } from "mobx-react-lite";
import { StoreContext } from "store/useStore";
import { store } from "./store/Store";

export const App = observer(() => {
    React.useEffect(() => {
        setTimeout(() => {
            store.changeTest();
        }, 5000);
    }, []);

    return (
        <StoreContext.Provider value={store}>
            <Test />
        </StoreContext.Provider>
    );
});
