import AnimatedText from "@/components/animation/AnimatedText";
import RevealImage from "@/components/animation/RevealImage";
import { homeImages } from "@/lib/content/site";

export default function HomePage() {
  return (
    <section style={{ paddingTop: "12rem" }}>
      <AnimatedText as="h1" text={"The social-first agency\nfor prestige beauty."} />
      <RevealImage src={homeImages.hero} alt="OGAKI studio" priority />
    </section>
  );
}
