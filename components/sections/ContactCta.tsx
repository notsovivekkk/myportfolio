import { Frame, Card, Button } from "@/components/ui/Primitives";

const EMAIL = "purayathvivek@gmail.com";
const MAILTO = `mailto:${EMAIL}?subject=Hey%20Vivek`;

/* The short version of the contact block. The full one lives on the
   Contact tab with the icon, the longer copy and the email pill. Here
   the page has already done the talking, so this is a heading and two
   buttons and nothing else. */
export default function ContactCta() {
  return (
    <Frame>
      <Card className="flex flex-col items-center gap-7 px-8 py-14 text-center sm:px-11 sm:py-16">
        <div className="flex flex-col items-center gap-2">
          <p className="text-base text-body">
            Available for GTM Engineering contracts.
          </p>
          <h2 className="max-w-[20ch] text-[24px] font-normal leading-[1.2] tracking-[-0.02em] text-ink sm:text-2xl">
            Let&apos;s build your revenue system.
          </h2>
        </div>

        <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
          <Button href={MAILTO} variant="primary" className="w-full sm:w-auto">
            Send an email
          </Button>
          <Button
            href="https://www.linkedin.com/in/vivek-m12/"
            variant="secondary"
            external
            className="w-full sm:w-auto"
          >
            Message on LinkedIn
          </Button>
        </div>
      </Card>
    </Frame>
  );
}
