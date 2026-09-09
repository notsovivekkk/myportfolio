import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import PageSections from "@/components/sections/PageSections";
import { navItems } from "@/lib/data";

/* One page. The nav is a table of contents for it rather than a router,
   so this component holds no state and stays a server component; only
   the nav and the interactive sections below ship JS. */
export default function Portfolio() {
  return (
    <>
      <Nav items={navItems} />

      {/* Only the 18px strip is cleared. The nav bar itself sits inside
          the first section's 66px frame shoulder, both the same grey, so
          the two read as one continuous shape rather than a bar floating
          above a separate block. */}
      <main className="mx-auto w-full max-w-page px-4 pb-16 pt-[18px] sm:px-5">
        <div className="mx-auto w-full max-w-content">
          <PageSections />
        </div>
      </main>

      <Footer />
    </>
  );
}
