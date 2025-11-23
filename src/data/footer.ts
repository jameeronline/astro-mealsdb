interface FooterLink {
  text: string;
  url: string;
  isStatic?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

export const footerSections: FooterSection[] = [
    {
        title: "Quick Links",
        links: [
            { text: "Home", url: "/" },
            { text: "Categories", url: "/categories" },
            { text: "Blog", url: "/blog" },
            { text: "About Us", url: "/about" },
            { text: "Favorites", url: "/favorites", isStatic: false }
        ]
    },
    {
        title: "Legal",
        links: [
            { text: "Privacy Policy", url: "/legal/privacy-policy" },
            { text: "Terms and Conditions", url: "/legal/terms-and-conditions" },
            { text: "Contact Us", url: "/company/contact" }
        ]
    },
    {
        title: "Recipes",
        links: [
            { text: "Popular Recipes", url: "/recipes/popular" },
            { text: "Latest Recipes", url: "/recipes/latest" },
            { text: "By Cuisine", url: "/recipes/cuisine" },
            { text: "By Ingredient", url: "/recipes/ingredients" }
        ]
    }
];