import React, { useCallback, useState } from "react";
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
    const [showFilters, setShowFilters] = useState(false);

    const handleDropdown = useCallback(() => setShowFilters((prev) => !prev), []);

    const handleFilters = useCallback((option: FilterWidgetOption) => {
        handler(option);
        setShowFilters((prev) => !prev);
    }, [handler]);

    return (
        <span className={styles.filterWidget} data-testid="filter-widget">
            <label className={cn({ [styles.checked]: showFilters })} data-testid="filter-widget-toggler">
                Filters
                <input onChange={handleDropdown} type="checkbox" />
            </label>
            {showFilters
                ? (
                    <div className={cn(styles.container)}>
                        {options.map((option) => {
                            const { title } = option;
                            const active = activeFilter === title;

                            return (
                                <label key={title} className={cn(styles.option, { [styles.active]: active })} data-testid={title}>
                                    {title}
                                    <input
                          // eslint-disable-next-line react/jsx-no-bind
                                        onChange={() => handleFilters(option)}
                                        checked={active}
                                        type="checkbox"
                                        title={title}
                                    />
                                </label>
                            );
                        })}
                    </div>
                )
                : null}
        </span>
    );
};
