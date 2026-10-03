import { notFound } from "next/navigation";

/* ==================================================================
   /kestrel, hidden for now.

   Returns the site's ordinary 404, with a real 404 status, so it is
   indistinguishable from any URL that never existed.

   The real page is kept, untouched, in KestrelPage.tsx in this folder.
   To bring it back, replace the whole of this file with:

     export { default, kestrelMetadata as metadata } from "./KestrelPage";
   ================================================================== */

export default function KestrelHidden() {
  notFound();
}
