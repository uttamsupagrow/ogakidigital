"use client";

import { useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const Wrapper = styled.span<{ $as?: string }>`
  display: block;
`;

const Line = styled.span`
  display: block;
  overflow: hidden; /* clipping mask */
  padding-bottom: 0.08em;
`;

const Inner = styled.span`
  display: block;
  will-change: transform;
`;

interface AnimatedTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  /** delay seconds before entrance */
  delay?: number;
  /** per-line stagger */
  stagger?: number;
  /** run on scroll into view instead of immediately */
  trigger?: boolean;
  duration?: number;
}

/**
 * Reconstructed reference split-text mask reveal: each line enters from
 * below its clipping mask with translateY(150%) + rotateZ(-10deg),
 * staggered — matching the production `--splitTextDelay` behavior.
 */
export default function AnimatedText({
  text,
  as = "p",
  className,
  delay = 0,
  stagger = 0.08,
  trigger = false,
  duration = 1.1,
}: AnimatedTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const lines = el.querySelectorAll("[data-line-inner]");
      if (prefersReducedMotion()) {
        gsap.set(lines, { yPercent: 0, rotate: 0, opacity: 1 });
        return;
      }
      gsap.set(lines, { yPercent: 150, rotate: -10, opacity: 1 });
      gsap.to(lines, {
        yPercent: 0,
        rotate: 0,
        duration,
        ease: "power3.out",
        stagger,
        delay,
        scrollTrigger: trigger
          ? { trigger: el, start: "top 85%", once: true }
          : undefined,
      });
    }, el);
    return () => ctx.revert();
  }, [text, delay, stagger, trigger, duration]);

  // Split on explicit \n or sentence-ish breaks for multi-line statements.
  const lines = text.split("\n");

  return (
    <Wrapper ref={ref} as={as} className={className}>
      {lines.map((line, i) => (
        <Line key={i}>
          <Inner data-line-inner>{line}</Inner>
        </Line>
      ))}
    </Wrapper>
  );
}
