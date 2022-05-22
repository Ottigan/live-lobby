import React from "react";

const LargeGrid: React.FC = () => (
    <svg viewBox="0 0 65 49" xmlns="http://www.w3.org/2000/svg">
        <rect width={30} height={22} rx={5} />
        <rect x={35} y={27} width={30} height={22} rx={5} />
        <rect y={27} width={30} height={22} rx={5} />
        <rect x={35} width={30} height={22} rx={5} />
    </svg>
);

export = LargeGrid;
