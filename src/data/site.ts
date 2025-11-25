export interface SocialLink {
    label: string;
    link: string;
}

export interface SiteConfig {
    title: string;
    tagline: string;
    logo: string;
    link: string;
    description: string;
    author: string;
    email: string;
    social: SocialLink[];
    copyright: string;
    language: string;
    themeColor: string;
}

// You can use an SVG string for the logo property like this:
export const siteConfig: SiteConfig = {
    title: "Meals DB",
    tagline: "Discover Delicious Meals from Around the World",
    logo: `<svg class="fill-primary" width="24px" height="24px" viewBox="0 -960 960 960" xmlns="http://www.w3.org/2000/svg"><path d="M400-160h160v-44l50-20q65-26 110.5-72.5T786-400H174q20 57 65 103.5T350-224l50 20v44Zm-80 80v-70q-107-42-173.5-130T80-480h80v-320l720-80v60l-460 52v68h460v60H420v160h460q0 112-66.5 200T640-150v70H320Zm0-620h40v-62l-40 5v57Zm-100 0h40v-50l-40 4v46Zm100 220h40v-160h-40v160Zm-100 0h40v-160h-40v160Zm260 80Z"/></svg>`,
    link: '/',
    description: "MealsDB is your go-to platform for exploring a wide variety of delicious meals and recipes from around the world. Whether you're a home cook or a food enthusiast, discover new flavors, cooking tips, and culinary inspiration.",
    author: "Jamal Mohamed Ameer",
    email: "contact@mealsdb.com",
    social: [
        { label: "Twitter", link: "https://twitter.com/mealsdb" },
        { label: "Facebook", link: "https://facebook.com/mealsdb" },
        { label: "Instagram", link: "https://instagram.com/mealsdb" },
        { label: "GitHub", link: "https://github.com/jamalmohamedameer/mealsdb" },
        { label: "LinkedIn", link: "https://linkedin.com/in/jamalmohamedameer" }
    ],
    copyright: "© 2024 MealsDB. All rights reserved.",
    language: "en",
    themeColor: "#39e079"
};