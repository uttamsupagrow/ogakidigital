import styled, { css } from "styled-components";
import Link from "next/link";

type BtnProps = {
  href: string;
  children?: React.ReactNode;
  className?: string;
  $variant?: "solid" | "outline" | "light";
};

/** Reference button: pill outline / solid, GT America label, hover slide fill. */
export const Button = styled(Link)<BtnProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  padding: 1.4rem 3.2rem;
  border-radius: 999px;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.typography.label};
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: color 0.4s ease, background-color 0.4s ease, border-color 0.4s ease;
  border: 1px solid currentColor;

  ${({ $variant = "outline", theme }) =>
    $variant === "solid" &&
    css`
      background: ${theme.colors.ink};
      color: ${theme.colors.paper};
      border-color: ${theme.colors.ink};
      &:hover {
        background: transparent;
        color: ${theme.colors.ink};
      }
    `}

  ${({ $variant = "outline", theme }) =>
    $variant === "outline" &&
    css`
      color: ${theme.colors.ink};
      &:hover {
        background: ${theme.colors.ink};
        color: ${theme.colors.paper};
      }
    `}

  ${({ $variant = "outline", theme }) =>
    $variant === "light" &&
    css`
      color: ${theme.colors.paper};
      &:hover {
        background: ${theme.colors.paper};
        color: ${theme.colors.ink};
      }
    `}
`;

export const Eyebrow = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.typography.micro};
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

export const Container = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding-inline: ${({ theme }) => theme.layout.gutter};
`;

export const Section = styled.section<{ $dark?: boolean }>`
  padding-block: clamp(8rem, 12vw, 16rem);
  ${({ $dark, theme }) =>
    $dark &&
    css`
      background: ${theme.colors.ink};
      color: ${theme.colors.paper};
    `}
`;
