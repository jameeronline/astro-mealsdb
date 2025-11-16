// Define the structure of a navigation link
interface NavLink {
    text: string;
    href: string;
}

interface HomeNavLink extends NavLink {
    // Additional properties for home link can be added here if needed
    description: string;
}

export const homeNavLink: HomeNavLink = {
    text: "MealsDB",
    href: "/",
    description: "Your ultimate destination for discovering, cooking, and sharing delicious meals from around the world.",
};

export const navLinks: NavLink[] = [
  { text: "Categories", href: "/categories" },
  { text: "Cuisines", href: "/cuisines" },
  { text: "Ingredients", href: "/ingredients" },
  { text: "Features", href: "/features" },
  { text: "Blog", href: "/blog" },
  { text: "Pricing", href: "/pricing" },
  { text: "About", href: "/about" },
];