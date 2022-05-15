import React from "react";

interface NavbarProps {
    className: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
    return <nav className={`${className}`}>Navbar</nav>;
};
