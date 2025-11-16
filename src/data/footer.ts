interface FooterLink {
  text: string;
  url: string;
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
            { text: "About Us", url: "/about" }
        ]
    },
    {
        title: "Legal",
        links: [
            { text: "Privacy Policy", url: "/privacy-policy" },
            { text: "Terms and Conditions", url: "/terms-and-conditions" },
            { text: "Contact Us", url: "/contact" }
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