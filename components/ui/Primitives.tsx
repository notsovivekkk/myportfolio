import type { ReactNode } from "react";

/* ============================================================
   Frame, the grey outer shell.
   Think of it as a passe-partout on a framed print: the mat board
   is what makes the print read as "placed" rather than "pasted".
   ============================================================ */
export function Frame({
  children,
  className = "",
  hero = false,
}: {
  children: ReactNode;
  className?: string;
  hero?: boolean;
}) {
  return (
    // pf-frame-hero is declared after pf-frame, so its padding wins.
    <div className={`pf-frame ${hero ? "pf-frame-hero" : ""} ${className}`}>
      {children}
    </div>
  );
}

/* Panel, grey frame with content sitting directly on it, no white
   card inside. For sections whose heading should feel recessed. */
export function Panel({
  children,
  className = "",
  hero = false,
}: {
  children: ReactNode;
  className?: string;
  hero?: boolean;
}) {
  // pf-panel-hero is declared after pf-panel, so its padding wins.
  return (
    <div className={`pf-panel ${hero ? "pf-panel-hero" : ""} ${className}`}>
      {children}
    </div>
  );
}

/* Card, the white inner surface that sits inside a Frame. */
export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`pf-card ${className}`}>{children}</div>;
}

/* Section, Frame + Card in one, with the standard inner padding.
   This is the block you'll reach for 90% of the time. */
export function Section({
  children,
  className = "",
  cardClassName = "",
}: {
  children: ReactNode;
  className?: string;
  cardClassName?: string;
}) {
  return (
    <Frame className={className}>
      <Card className={`p-5 sm:p-10 ${cardClassName}`}>{children}</Card>
    </Frame>
  );
}

/* ============================================================
   SectionHeading, label / title / subtitle, always in that order.
   Consistent entry into every section means the eye never has to
   re-learn where it is on the page.
   ============================================================ */
export function SectionHeading({
  label,
  title,
  subtitle,
}: {
  label?: string;
  title: ReactNode;
  subtitle?: ReactNode;
}) {
  return (
    // 6px between all three. The size step (14 → 18 → 14) does the
    // separating, so the gap doesn't have to.
    <div className="flex flex-col gap-1.5">
      {label ? <p className="text-base text-body">{label}</p> : null}
      <h2 className="text-lg font-medium text-ink">{title}</h2>
      {subtitle ? (
        <p className="max-w-[52ch] text-base text-body">{subtitle}</p>
      ) : null}
    </div>
  );
}

/* Eyebrow, the small all-caps label above a block of copy.
   +0.04em tracking is what stops all-caps from looking cramped. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-sm font-medium uppercase tracking-[0.04em] text-muted">
      {children}
    </p>
  );
}

/* Pill, neutral tag. Used for skills and project tags. */
export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] bg-frame px-3 py-1.5 text-base text-body">
      {children}
    </span>
  );
}

/* ============================================================
   Buttons, render as <a> when given an href, <button> otherwise.
   ============================================================ */
type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
  external?: boolean;
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  external = false,
}: ButtonProps) {
  const classes = `pf-btn pf-btn-${variant} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

/* ArrowIcon, the recurring "go somewhere" affordance. */
export function ArrowIcon({ size = 10 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden="true"
    >
      <path d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
  );
}
