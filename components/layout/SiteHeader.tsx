"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/lib/content/navigation";
import DropdownNavigation from "@/components/navigation/DropdownNavigation";
import MobileNavigation from "@/components/navigation/MobileNavigation";

const Bar = styled.div<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 90;
  height: ${({ theme }) => theme.layout.headerHeight};
  display: flex;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.sans};
  background: ${({ $scrolled, theme }) => ($scrolled ? theme.colors.paper : "transparent")};
  transition: background-color 0.4s ease, box-shadow 0.4s ease;
  ${({ $scrolled, theme }) => $scrolled && `box-shadow: 0 1px 0 ${theme.colors.tint};`}
`;

const Inner = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding-inline: ${({ theme }) => theme.layout.gutter};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2.4rem;
`;

const Logo = styled(Link)`
  font-weight: 700;
  font-size: 1.8rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
`;

const MenuBtn = styled.button`
  display: none;
  background: none;
  border: none;
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.small};
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 0.8rem 0;
  color: ${({ theme }) => theme.colors.ink};
  @media (max-width: 1024px) {
    display: inline-block;
  }
`;

const Locations = styled.div`
  display: flex;
  gap: 1.2rem;
  font-size: ${({ theme }) => theme.typography.micro};
  font-weight: 500;
  letter-spacing: 0.14em;
  opacity: 0.6;
  @media (max-width: 1280px) {
    display: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  @media (max-width: 1024px) {
    display: none;
  }
`;

const ItemWrap = styled.div`
  position: relative;
`;

const TopLink = styled(Link)<{ $active?: boolean }>`
  display: inline-block;
  padding: 0.9rem 1.4rem;
  font-size: ${({ theme }) => theme.typography.small};
  font-weight: 500;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.ink};
  position: relative;
  &::after {
    content: "";
    position: absolute;
    left: 1.4rem;
    right: 1.4rem;
    bottom: 0.35rem;
    height: 1px;
    background: currentColor;
    transform: scaleX(${({ $active }) => ($active ? 1 : 0)});
    transform-origin: left;
    transition: transform 0.35s ease;
  }
  &:hover::after {
    transform: scaleX(1);
  }
`;

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("disable-scroll", open);
    return () => document.body.classList.remove("disable-scroll");
  }, [open]);

  return (
    <>
      <a href="#main" className="visually-hidden">
        Skip to content
      </a>
      <Bar as="header" role="banner" $scrolled={scrolled}>
        <Inner>
          <Logo href="/" aria-label="OGAKI home">
            OGAKI®
          </Logo>
          <Nav aria-label="Primary">
            {mainNav.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href + "/")) ||
                (item.children?.some(
                  (c) => pathname === c.href || pathname.startsWith(c.href + "/")
                ) ?? false);
              return (
                <ItemWrap key={item.label}>
                  <TopLink href={item.href} $active={active}>
                    {item.label}
                  </TopLink>
                  {item.children && <DropdownNavigation item={item} />}
                </ItemWrap>
              );
            })}
          </Nav>
          <Locations>
            <span>NYC</span>
            <span>LA</span>
          </Locations>
          <MenuBtn
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? "Close" : "Menu"}
          </MenuBtn>
        </Inner>
      </Bar>
      <MobileNavigation open={open} onClose={() => setOpen(false)} nav={mainNav} />
    </>
  );
}
