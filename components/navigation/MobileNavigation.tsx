"use client";

import { useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import type { NavItem } from "@/lib/content/types";
import { prefersReducedMotion } from "@/components/animation/AnimatedText";

const Overlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 85;
  background: ${({ theme }) => theme.colors.paper};
  font-family: ${({ theme }) => theme.fonts.sans};
  display: flex;
  flex-direction: column;
  padding: calc(${({ theme }) => theme.layout.headerHeight} + 2.4rem) clamp(2rem, 6vw, 6.4rem) 4rem;
  overflow-y: auto;
  clip-path: inset(0 0 100% 0);
  pointer-events: none;
  transition: clip-path 0.5s cubic-bezier(0.77, 0, 0.18, 1);
  ${({ $open }) =>
    $open &&
    css`
      clip-path: inset(0 0 0% 0);
      pointer-events: auto;
    `}
  @media (min-width: 1025px) {
    display: none;
  }
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Row = styled.li<{ $delay?: number }>`
  border-bottom: 1px solid ${({ theme }) => theme.colors.tint};
`;

const BigLink = styled(Link)`
  display: block;
  padding: 1.8rem 0;
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: clamp(3rem, 9vw, 5rem);
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.ink};
  &:hover {
    opacity: 0.6;
  }
`;

const SubList = styled.ul`
  list-style: none;
  padding: 0 0 1.6rem 1.6rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const SubLink = styled(Link)`
  font-size: ${({ theme }) => theme.typography.small};
  font-weight: 500;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.ink};
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;

const Foot = styled.div`
  margin-top: auto;
  padding-top: 3.2rem;
  display: flex;
  gap: 2.4rem;
  font-size: ${({ theme }) => theme.typography.micro};
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

interface Props {
  open: boolean;
  onClose: () => void;
  nav: NavItem[];
}

export default function MobileNavigation({ open, onClose, nav }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // close on route change
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Escape key closes menu
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // slide-in stagger for items (reference mobile-menu behavior)
  useEffect(() => {
    if (!open || !ref.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current!.querySelectorAll("[data-menu-item]"),
        { yPercent: 150, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.05, ease: "power3.out", delay: 0.15 }
      );
    }, ref);
    return () => ctx.revert();
  }, [open]);

  return (
    <Overlay
      id="mobile-menu"
      ref={ref}
      $open={open}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      inert={!open}
    >
      <nav aria-label="Mobile">
        <List>
          {nav.map((item) => (
            <Row key={item.label} data-menu-item>
              <BigLink href={item.href}>{item.label}</BigLink>
              {item.children && (
                <SubList>
                  {item.children.map((c) => (
                    <li key={c.href}>
                      <SubLink href={c.href}>{c.label}</SubLink>
                    </li>
                  ))}
                </SubList>
              )}
            </Row>
          ))}
        </List>
      </nav>
      <Foot data-menu-item>
        <span>NYC</span>
        <span>LA</span>
      </Foot>
    </Overlay>
  );
}
