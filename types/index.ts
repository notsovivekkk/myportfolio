export type TabId = "home" | "about" | "work" | "contact";

export interface NavItem {
  id: TabId;
  label: string;
}

export interface WorkProject {
  id: string;
  title: string;
  subtitle: string;
  span?: "full" | "half";
}
