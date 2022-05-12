import React, { useEffect } from "react";
import { Test } from "components/Test";
import { observer } from "mobx-react-lite";
import { Store } from "./store/Store";

const store = new Store("foo");

export const App = observer(() => {
    useEffect(() => {
        setTimeout(() => {
            store.changeTest();
        }, 5000);
    }, []);

    return (
        <div>
            <Test text={store.name} />
        </div>
    );
});
