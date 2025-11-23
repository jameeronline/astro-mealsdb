export interface imageType {
    src: string;
    width: number;
    height: number;
    format: "png" | "jpg" | "jpeg" | "tiff" | "webp" | "gif" | "svg" | "avif";
}

export interface Cuisine {
    title: string;
    slug: string;
    date: string;
    thumbnail: imageType;
}


export interface Category {
    title: string;
    slug: string;
    date: string;
    thumbnail: imageType;
}

export interface Ingredient {
    title: string;
    slug: string;
    date: string;
    thumbnail: imageType;
}