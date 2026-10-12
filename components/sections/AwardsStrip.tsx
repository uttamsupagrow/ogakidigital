"use client";

import styled from "styled-components";
import AnimatedText from "@/components/animation/AnimatedText";
import { awardBands } from "@/lib/content/awards";

const Wrap = styled.section`
  padding: clamp(6rem, 10vw, 12rem) 0;
  border-top: 1px solid ${({ theme }) => theme.colors.tint};
`;

const Head = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.typography.micro};
  letter-spacing: 0.18em;
  text-transform: uppercase;
  opacity: 0.7;
  margin-bottom: 3.2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
  gap: 2.4rem;
`;

const Band = styled.div`
  padding: 2.4rem;
  background: ${({ theme }) => theme.colors.tint};
  border-radius: 1.6rem;
`;

const Big = styled.p`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-weight: 300;
  font-size: clamp(2.4rem, 3.2vw, 3.6rem);
  line-height: 1.15;
`;

const Sub = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.typography.small};
  margin-top: 1.2rem;
  opacity: 0.8;
`;

export default function AwardsStrip() {
  return (
    <Wrap className="container">
      <Head>Award Winning Work</Head>
      <Grid>
        {awardBands.map((b, i) => (
          <Band key={i}>
            <Big>
              <AnimatedText as="span" text={b.headline} trigger delay={i * 0.05} />
            </Big>
            <Sub>{b.sub}</Sub>
          </Band>
        ))}
      </Grid>
    </Wrap>
  );
}
