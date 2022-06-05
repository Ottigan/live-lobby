import React, { useEffect, useState } from "react";
import cn from "classnames";
import { getDateDiff } from "utils";
import styles from "./styles.module.scss";

interface AvatarProps {
    gameImageDivRef: React.RefObject<HTMLDivElement>;
    online: boolean;
    opensAt: string | undefined;
}

export const Avatar: React.FC<AvatarProps> = (props) => {
    const { gameImageDivRef, online, opensAt } = props;
    const [opensIn, setOpensIn] = useState<string | null>("");

    useEffect(() => {
        if (opensAt) {
            setOpensIn(getDateDiff(new Date(), new Date(opensAt)));

            const interval = setInterval(() => setOpensIn(getDateDiff(new Date(), new Date(opensAt))), 1000);

            return () => clearInterval(interval);
        }
    }, [opensAt]);

    return (
        <div ref={gameImageDivRef} className={cn(styles.avatar, "image")} data-testid="game-avatar">
            {!online
                ? (
                    <div className={styles.overlay} data-testid="game-avatar-overlay">
                        {opensIn
                            ? (
                                <>
                                    Table opens in:
                                    <span data-testid="game-avatar-countdown">{opensIn}</span>
                                </>
                            )
                            : "Table opens now!"
                        }
                    </div>
                )
                : null}
        </div>
    );
};
