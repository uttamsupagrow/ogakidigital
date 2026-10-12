"use client";

import { useEffect, useRef } from "react";
import styled from "styled-components";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "./AnimatedText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Frame = styled.div<{ $ratio: string; $radius?: string }>`
  position: relative;
  width: 100%;
  aspect-ratio: ${({ $ratio }) => $ratio};
  overflow: hidden;
  border-radius: ${({ $radius }) => $radius ?? "0"};
  background: ${({ theme }) => theme.colors.tint};
`;

const Img = styled(Image)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  will-change: transform;
`;

interface RevealImageProps {
  src: string;
  alt: string;
  ratio?: string; // e.g. "4 / 3"
  radius?: string;
  /** parallax strength in % of frame height */
  parallax?: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

/**
 * Reference-style image reveal: clip-mask scale/position entrance with a
 * subtle scroll parallax on the inner image (as seen on hero + editorial
 * blocks of ogakidigital.com).
 */
export default function RevealImage({
  src,
  alt,
  ratio = "4 / 3",
  radius,
  parallax = 8,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  className,
}: RevealImageProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const img = el.querySelector("img");
    const ctx = gsap.context(() => {
      if (prefersReducedMotion() || !img) return;
      gsap.fromTo(
        el,
        { clipPath: "inset(0% 0% 100% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        }
      );
      gsap.fromTo(
        img,
        { yPercent: -parallax / 2, scale: 1.12 },
        {
          yPercent: parallax / 2,
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [parallax]);

  return (
    <Frame ref={ref} $ratio={ratio} $radius={radius} className={className}>
      <Img
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectFit: "cover" }}
      />
    </Frame>
  );
}
