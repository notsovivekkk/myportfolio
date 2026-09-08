import { Frame, Card } from "@/components/ui/Primitives";
import { socialLinks } from "@/components/ui/SocialIcons";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mx-auto w-full max-w-page px-4 pb-16 sm:px-5">
      <div className="mx-auto w-full max-w-content">
        <Frame>
          <Card className="flex flex-col items-center justify-between gap-4 px-6 py-5 sm:flex-row sm:px-8">
            <p className="text-base text-body">
              Copyright © {year} Vivek M.
            </p>

            <div className="flex items-center gap-2">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="pf-icon-btn"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </Card>
        </Frame>
      </div>
    </footer>
  );
}
