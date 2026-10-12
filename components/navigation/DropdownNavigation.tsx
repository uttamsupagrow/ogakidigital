"use client";

import { useState } from "react";
import styled, { css } from "styled-components";
import Link from "next/link";
import type { NavItem } from "@/lib/content/types";

const Panel = styled.div<{ $open: boolean }>`
  position: absolute;
  top: calc(100% + 0.4rem);
  left: 0;
  min-width: 26rem;
  padding: 1.2rem 0;
  background: ${({ theme }) => theme.colors.paper};
  border: 1px solid ${({ theme }) => theme.colors.tint};
  border-radius: 1.2rem;
  box-shadow: 0 2.4rem 4.8rem rgba(34, 31, 32, 0.08);
  opacity: 0;
  transform: translateY(1.2rem);
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.3s ease;
  z-index: 95;

  ${({ $open }) =>
    $open &&
    css`
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    `}
`;

const ChildLink = styled(Link)`
  display: block;
  padding: 1rem 2rem;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.typography.small};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.ink};
  transition: background-color 0.2s ease, padding-left 0.2s ease;
  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.colors.tint};
    padding-left: 2.4rem;
  }
`;

/**
 * Desktop dropdown (audited behavior): opens on hover of the parent item and
 * on keyboard focus within the group.
 */
export default function DropdownNavigation({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <Panel $open={open} role="group" aria-label={`${item.label} submenu`}>
        {item.children?.map((c) => (
          <ChildLink key={c.href} href={c.href}>
            {c.label}
          </ChildLink>
        ))}
      </Panel>
    </div>
  );
}
