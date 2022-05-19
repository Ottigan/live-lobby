import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";

interface NavbarProps {
    categories: Category[];
    className: string;
}

export const Navbar: React.FC<NavbarProps> = ({ categories, className }) => {
    return (
        <nav className={`${styles.Navbar} ${className}`}>
            <ul>
                {categories.map((category) => (
                    <li key={category.name}>
                        <NavLink to={category.path}>{category.name}</NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
