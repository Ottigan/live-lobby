import { useStore } from "hooks/useStore";
import { observer } from "mobx-react-lite";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Category } from "./Category";

interface CategoriesProps {
    className: string;
}

export const Categories: React.FC<CategoriesProps> = observer(({ className }) => {
    const store = useStore();
    const { categories } = store.categoriesStore;

    return (
        <div className={className}>
            {categories.length
                ? (
                    <Routes>
                        {categories.map((category) => {
                            const { name, path, bgColor, gameIds } = category;

                            return (
                                <Route
                                    key={name}
                                    path={path}
                                    element={(
                                        <Category
                                            bgColor={bgColor}
                                            gameIds={gameIds}
                                        />
                                    )}
                                />
                            );
                        })}
                        <Route path="/*" element={<Navigate to="/roulette" replace={true} />} />
                    </Routes>
                ) :
                null
          }
        </div>
    );
});
