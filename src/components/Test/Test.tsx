import React from "react";
import { observer } from "mobx-react-lite";

interface Props {
    text?: string;
}

const defaultProps = {
    text: "Hello World!",
};

export const Test: React.FC<Props> = observer((props) => {
    const { text } = props;

    return (
        <div>
            <h1>{text}</h1>
        </div>
    );
});

Test.defaultProps = defaultProps;
