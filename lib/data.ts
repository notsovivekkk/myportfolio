import type { NavItem, WorkProject } from "@/types";

export const navItems: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];

export const workProjects: WorkProject[] = [
  {
    id: "ai-therapy",
    title: "AI Therapy",
    subtitle: "RAG-Based chat system",
    span: "half",
  },
  {
    id: "fitness-app",
    title: "Fitness App",
    subtitle: "React Native + PostgreSQL",
    span: "half",
  },
  {
    id: "growthbae",
    title: "Growthbae",
    subtitle: "Agency Co-Founder",
    span: "full",
  },
];
