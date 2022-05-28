import React from "react";
import cn from "classnames";
import styles from "../styles.module.scss";

interface AvatarProps {
    gameImageDivRef: React.MutableRefObject<HTMLDivElement | null>;
    online: boolean;
}

const Avatar: React.FC<AvatarProps> = (props) => {
    const { gameImageDivRef, online } = props;

    return (
        <div className={cn(styles.Avatar, "image")} ref={gameImageDivRef}>
            {!online
                ? <div className="overlay">Hi mom!</div>
                : null}
        </div>
    );
};

export = Avatar;
