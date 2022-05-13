import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "store/useStore";

interface Props {
    text?: string;
}

const defaultProps = {
    text: "Hello World!",
};

export const Test: React.FC<Props> = observer((props) => {
    const { text } = props;
    const store = useStore();

    return (
        <div>
            <h1>{text}</h1>
            <p>{store.name}</p>
        </div>
    );
});

Test.defaultProps = defaultProps;
