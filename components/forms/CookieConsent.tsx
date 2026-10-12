"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { loadAnalytics, storeConsent, getStoredConsent } from "@/lib/analytics/gtag";

const Banner = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 120;
  max-width: min(72rem, calc(100vw - 4rem));
  background: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.paper};
  border-radius: 1.6rem;
  padding: 2.4rem 2.8rem;
  font-family: ${({ theme }) => theme.fonts.sans};
  box-shadow: 0 2rem 6rem rgba(3, 3, 3, 0.35);
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.typography.label};
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-bottom: 0.8rem;
`;

const Copy = styled.p`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: ${({ theme }) => theme.typography.small};
  line-height: 1.55;
  a {
    text-decoration: underline;
  }
`;

const Btns = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-top: 1.6rem;
  flex-wrap: wrap;
`;

const Btn = styled.button<{ $primary?: boolean }>`
  padding: 1rem 2.4rem;
  border-radius: 999px;
  font-size: ${({ theme }) => theme.typography.micro};
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 1px solid ${({ theme }) => theme.colors.paper};
  background: ${({ $primary, theme }) =>
    $primary ? theme.colors.paper : "transparent"};
  color: ${({ $primary, theme }) =>
    $primary ? theme.colors.ink : theme.colors.paper};
  transition: opacity 0.25s ease;
  &:hover {
    opacity: 0.8;
  }
`;

const Revisit = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 110;
  width: 4.4rem;
  height: 4.4rem;
  border-radius: 50%;
  border: none;
  background: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.paper};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 1rem;
  letter-spacing: 0.06em;
  box-shadow: 0 0.8rem 2.4rem rgba(3, 3, 3, 0.25);
  &:hover {
    opacity: 0.85;
  }
`;

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [decided, setDecided] = useState(true);

  useEffect(() => {
    const c = getStoredConsent();
    if (c === "unknown") {
      setVisible(true);
      setDecided(false);
    } else {
      loadAnalytics();
    }
  }, []);

  function choose(grant: boolean) {
    storeConsent(grant ? "granted" : "denied");
    if (grant) loadAnalytics();
    setVisible(false);
    setDecided(true);
  }

  return (
    <>
      {visible && (
        <Banner role="dialog" aria-modal="false" aria-label="Cookie consent">
          <Title>(Cookie Policy)</Title>
          <Copy>
            We use cookies to enhance site navigation, analyze site usage, and
            assist in our marketing efforts. View our{" "}
            <Link href="/privacy-policy">Privacy Policy</Link> for more details.
          </Copy>
          <Btns>
            <Btn $primary type="button" onClick={() => choose(true)}>
              Accept All
            </Btn>
            <Btn type="button" onClick={() => choose(false)}>
              Deny All
            </Btn>
          </Btns>
        </Banner>
      )}
      {!visible && decided && (
        <Revisit
          type="button"
          aria-label="Revisit cookie consent settings"
          onClick={() => setVisible(true)}
        >
          COOKIES
        </Revisit>
      )}
    </>
  );
}
