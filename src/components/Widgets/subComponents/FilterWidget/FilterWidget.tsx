import React from "react";
import cn from "classnames";
import { Filter, FilterWidgetOption } from "types";
import styles from "./styles.module.scss";

interface FilterWidgetProps {
    handler: (filter: Filter) => void;
    activeFilter: string | undefined;
    options: FilterWidgetOption[];
}

export const FilterWidget: React.FC<FilterWidgetProps> = (props) => {
    const { handler, activeFilter, options } = props;

    return (
        <span className={styles.FilterWidget}>
            {options.map((option) => {
                const { title } = option;
                const active = activeFilter === title;

                return (
                    <input
                        key={title}
                        // eslint-disable-next-line react/jsx-no-bind
                        onChange={() => handler(option)}
                        checked={active}
                        type="checkbox"
                        title={title}
                        className={cn(styles.Option, { active })}
                        data-title={title}
                    />
                );
            })}
        </span>

    );
};
