import { About } from "@/components/About";
import { Branches } from "@/components/Branches";
import { Clubs } from "@/components/Clubs";
import { Contacts } from "@/components/Contacts";
import { Documents } from "@/components/Documents";
import { EnrollDialog } from "@/components/EnrollDialog";
import { Food } from "@/components/Food";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Groups } from "@/components/Groups";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Providers } from "@/components/Providers";
import { SkipLink } from "@/components/SkipLink";
import { getSiteMedia } from "@/lib/media";

export default function Home() {
  const media = getSiteMedia();
  return (
    <Providers>
      <SkipLink />
      <Header logo={media.logo} />
      <main id="main">
        <Hero hero={media.hero} />
        <About photos={media.about} wide={media.aboutWide} />
        <Branches photos={media.branchPhotos} />
        <Groups />
        <Food />
        <Clubs />
        <Gallery photos={media.gallery} />
        <Documents />
        <Contacts />
      </main>
      <Footer logo={media.logo} />
      <EnrollDialog />
    </Providers>
  );
}
