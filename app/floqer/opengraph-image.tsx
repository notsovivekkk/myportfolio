import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

/* The link preview for /floqer (LinkedIn, Slack, WhatsApp): the page's
   own look, generated at build time. Floqer's dotted off-white ground,
   a white card, his photo, the title, and their orange square. */

export const alt = "Vivek × Floqer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const photo = await readFile(path.join(process.cwd(), "public/images/dp.jpg"));
  const src = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F6F6F6",
          backgroundImage:
            "radial-gradient(rgba(4,3,5,0.16) 1.5px, transparent 1.8px)",
          backgroundSize: "22px 22px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 1040,
            padding: "64px 72px",
            borderRadius: 36,
            backgroundColor: "#FFFFFF",
            boxShadow: "0 0 0 4px #E7E6E3",
            gap: 40,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              width={112}
              height={112}
              style={{ borderRadius: 999, objectFit: "cover" }}
              alt=""
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: 40, color: "#040305", fontWeight: 600 }}>
                Vivek M
              </div>
              <div
                style={{
                  fontSize: 22,
                  color: "#C2410C",
                  letterSpacing: 3,
                  textTransform: "uppercase",
                }}
              >
                GTM Engineer Application · Floqer
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <div style={{ width: 22, height: 22, backgroundColor: "#FF4F12" }} />
            <div style={{ fontSize: 64, color: "#040305", letterSpacing: -1.5 }}>
              Vivek × Floqer
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
