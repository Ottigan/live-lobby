import React, { useEffect, useState } from "react";
import cn from "classnames";
import { getDateDiff } from "utils";
import styles from "../styles.module.scss";

interface AvatarProps {
    gameImageDivRef: React.MutableRefObject<HTMLDivElement | null>;
    online: boolean;
    opensAt: string;
}

const Avatar: React.FC<AvatarProps> = (props) => {
    const { gameImageDivRef, online, opensAt } = props;
    const [opensIn, setOpensIn] = useState<string | null>(null);

    useEffect(() => {
        setOpensIn(getDateDiff(new Date(), new Date(opensAt)));

        const interval = setInterval(() => setOpensIn(getDateDiff(new Date(), new Date(opensAt))), 1000);

        return () => clearInterval(interval);
    }, [opensAt]);

    return (
        <div className={cn(styles.Avatar, "image")} ref={gameImageDivRef}>
            {!online
                ? (
                    <div className="overlay">
                        {opensIn
                            ? (
                                <>
                                    Table opens in:
                                    <br />
                                    {opensIn}
                                </>
                            )
                            : null
                        }
                    </div>
                )
                : null}
        </div>
    );
};

export = Avatar;
