import type { NavItem } from "@/types";

/* The nav is now a table of contents for one page rather than a set of
   routes. Each id matches a section id rendered in PageSections. */
export const navItems: NavItem[] = [
  { id: "top", label: "Home" },
  { id: "story", label: "About" },
  { id: "background", label: "Background" },
  { id: "contact", label: "Contact" },
];
