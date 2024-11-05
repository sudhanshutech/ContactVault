export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
      auth: false,
    },
    {
      label: "Contacts",
      href: "/contacts",
      auth: true,
    },
    {
      label: "All Contacts",
      href: "/all-contacts",
      auth: true,
    },
    {
      label: "About",
      href: "/about",
      auth: false,
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
      auth: false,
    },
    {
      label: "Contacts",
      href: "/contacts",
      auth: true,
    },
    {
      label: "All Contacts",
      href: "/all-contacts",
      auth: true,
    },
    {
      label: "About",
      href: "/about",
      auth: false,
    },
  ],
  authItems: [
    {
      label: "Login",
      href: "/login",
      auth: false,
    },
    {
      label: "Register",
      href: "/register",
      auth: false,
    },
    {
      label: "Logout",
      href: "/logout",
      auth: true,
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
