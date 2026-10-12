import { createGlobalStyle } from "styled-components";

/**
 * Global styles reconstructed from the reference site's global stylesheet.
 * html font-size 62.5% (1rem = 10px), Reckless body at 1.8rem/1.5,
 * selection colors, focus rings, Lenis smooth-scroll rules.
 */
export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  * { margin: 0; padding: 0; }

  img, picture, video, canvas, svg, iframe {
    display: block;
    max-width: 100%;
  }

  html {
    font-size: 62.5%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
  }

  body {
    font-size: 1.8rem;
    font-family: ${({ theme }) => theme.fonts.serif};
    font-style: normal;
    font-weight: 400;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.ink};
    background-color: ${({ theme }) => theme.colors.paper};
  }

  p, h1, h2, h3, h4, h5, h6 {
    font-weight: normal;
    overflow-wrap: break-word;
  }

  a, button {
    color: currentColor;
    text-decoration: none;
  }

  input, button, textarea, select { font: inherit; }
  button { cursor: pointer; }

  ::selection {
    background: ${({ theme }) => theme.colors.ink};
    color: ${({ theme }) => theme.colors.paper};
    text-shadow: none;
  }

  *:focus {
    outline-offset: 0.2rem;
    outline-color: ${({ theme }) => theme.colors.ink};
  }
  *:focus:not(:focus-visible) { outline: none; }
  a:focus-visible, button:focus-visible {
    outline: 0.2rem solid ${({ theme }) => theme.colors.ink};
  }

  /* Dark sections need inverted focus rings */
  [data-theme="dark"] :focus-visible {
    outline-color: ${({ theme }) => theme.colors.paper};
  }

  html.lenis, html.lenis body { height: auto; }
  .lenis.lenis-smooth { scroll-behavior: auto !important; }
  .lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
  .lenis.lenis-stopped { overflow: hidden; }
  .lenis.lenis-scrolling iframe { pointer-events: none; }

  body.disable-scroll { overflow: hidden; }

  .visually-hidden {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;
