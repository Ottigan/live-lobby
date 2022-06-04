declare module "*.module.scss" {
    const classNames: Record<string, string>;
    export = classNames;
}

declare module "*.jpg" {
    const path: string;
    export = path;
}

declare module "*.svg" {
    const path: string;
    export = path;
}
declare module "*.png" {
    const path: string;
    export = path;
}
