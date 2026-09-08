/* Line icons at a shared 1.5px stroke on a 24px grid.
   Matching stroke weight across an icon set matters more than the
   drawings themselves, it's what makes them read as one family. */

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} {...base}>
      <path d="M4.5 3.75h4.5l10.5 16.5h-4.5z" />
      <path d="M4.5 20.25l6.176-6.794" />
      <path d="M19.5 3.75l-6.176 6.794" />
    </svg>
  );
}

export function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} {...base}>
      <rect x="3" y="3" width="18" height="18" rx="1.5" />
      <path d="M8.25 10.5v6" />
      <path d="M11.25 16.5v-3.375a2.625 2.625 0 0 1 5.25 0V16.5" />
      <circle cx="8.25" cy="7.5" r="1.125" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} {...base}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.25" cy="6.75" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function MailIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} {...base}>
      <rect x="3" y="5.25" width="18" height="13.5" rx="1.5" />
      <path d="M3 6l9 7 9-7" />
    </svg>
  );
}

export const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/vivek-m12/",
    Icon: LinkedInIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/notso_vivekkk",
    Icon: InstagramIcon,
  },
  {
    label: "Email",
    href: "mailto:purayathvivek@gmail.com?subject=Hey%20Vivek",
    Icon: MailIcon,
  },
];
