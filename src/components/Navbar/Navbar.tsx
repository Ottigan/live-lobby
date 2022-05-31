import React from "react";
import { NavLink } from "react-router-dom";
import cn from "classnames";
import { Category } from "types";
import styles from "./styles.module.scss";

interface NavbarProps {
    categories: Category[];
}

export const Navbar: React.FC<NavbarProps> = ({ categories }) => {
    return (
        <nav className={cn(styles.Navbar)}>
            <ul>
                {categories.map((category) => {
                    const { path, name } = category;

                    return (
                        <li key={name}>
                            <NavLink to={path}>{name}</NavLink>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};
