import styled from "styled-components";
import Link from "next/link";
import { footerNav } from "@/lib/content/navigation";
import { CONTACT_EMAIL, address, socials } from "@/lib/content/site";
import NewsletterForm from "@/components/forms/NewsletterForm";

const Wrap = styled.footer`
  background: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.paper};
  font-family: ${({ theme }) => theme.fonts.sans};
  padding: clamp(6.4rem, 10vw, 12rem) 0 3.2rem;
`;

const Inner = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding-inline: ${({ theme }) => theme.layout.gutter};
`;

const Top = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  gap: clamp(4rem, 8vw, 10rem);
  align-items: start;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const NewsTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-weight: 300;
  font-size: clamp(4rem, 7vw, 8.4rem);
  line-height: 1.02;
  letter-spacing: -0.01em;
`;

const Eyebrow = styled.p`
  font-size: ${({ theme }) => theme.typography.micro};
  letter-spacing: 0.18em;
  text-transform: uppercase;
  opacity: 0.7;
  margin-bottom: 2.4rem;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const BlockTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.label};
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  opacity: 0.6;
  margin-bottom: 1.2rem;
`;

const A = styled(Link)`
  display: block;
  padding: 0.4rem 0;
  font-size: ${({ theme }) => theme.typography.small};
  transition: opacity 0.25s ease;
  &:hover {
    opacity: 0.65;
  }
`;

const Ext = styled.a`
  display: block;
  padding: 0.4rem 0;
  font-size: ${({ theme }) => theme.typography.small};
  &:hover {
    opacity: 0.65;
  }
`;

const P = styled.p`
  font-size: ${({ theme }) => theme.typography.small};
  line-height: 1.7;
`;

const Bottom = styled.div`
  margin-top: clamp(6rem, 10vw, 10rem);
  padding-top: 2.4rem;
  border-top: 1px solid rgba(242, 237, 235, 0.15);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1.6rem;
  font-size: ${({ theme }) => theme.typography.micro};
  letter-spacing: 0.08em;
`;

const LegalLink = styled(Link)`
  &:hover {
    text-decoration: underline;
  }
`;

export default function SiteFooter() {
  return (
    <Wrap data-theme="dark">
      <Inner>
        <Top>
          <div>
            <NewsTitle>
              Don&rsquo;t Miss A Thing
              <br />
              With OGAKI<sup>&reg;</sup>
            </NewsTitle>
            <Eyebrow style={{ marginTop: "2.4rem" }}>
              Expert insights direct to your inbox
            </Eyebrow>
            <NewsletterForm dark />
          </div>
          <Col>
            <div>
              <BlockTitle>Get In Touch</BlockTitle>
              <Ext href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</Ext>
            </div>
            <div>
              <BlockTitle>Find Us</BlockTitle>
              <P>
                NYC / LA
                <br />
                {address.line1}
                <br />
                {address.line2}
              </P>
            </div>
            <div>
              <BlockTitle>Sitemap</BlockTitle>
              {footerNav.map((n) => (
                <A key={n.href} href={n.href}>
                  {n.label}
                </A>
              ))}
              <A href="/privacy-policy">Privacy Policy</A>
              <A href="/terms-conditions">Terms &amp; Conditions</A>
            </div>
            <div>
              <BlockTitle>Follow Us</BlockTitle>
              {socials.map((s) => (
                <Ext key={s.href} href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </Ext>
              ))}
            </div>
          </Col>
        </Top>
        <Bottom>
          <span>&copy; 2026 OGAKI, LLC</span>
          <span>
            <LegalLink href="/privacy-policy">Privacy Policy</LegalLink>{"  "}
            <LegalLink href="/terms-conditions">Terms &amp; Conditions</LegalLink>
          </span>
        </Bottom>
      </Inner>
    </Wrap>
  );
}
