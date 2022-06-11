import React from "react";
import { useStore } from "hooks/useStore";
import { observer } from "mobx-react-lite";
import { Navigate, Route, Routes } from "react-router-dom";
import { Category } from "./Category";

export const Categories = observer(() => {
    const { categories } = useStore("CategoriesStore");

    return (
        <>
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
                        <Route path="/*" element={<Navigate to={categories[0].path} replace={true} />} />
                    </Routes>
                ) :
                null
          }
        </>
    );
});
