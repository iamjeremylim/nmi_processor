import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* 1. Use a more-intuitive box-sizing model */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* 2. Remove default margin */
  * {
    margin: 0;
  }

  #root {
    --base-padding-vertical: 2.5rem;
    --base-padding-horizontal: 3rem;
    --spacing-1: 0.25rem;
    --spacing-2: 0.5rem;
    --spacing-3: 0.75rem;
    --spacing-4: 1rem;
    --radius-sm: 0.25rem;
    --radius-md: 0.375rem;
    --radius-lg: 0.5rem;

    --white: #ffffff;
    --gray-50: #fafafa;
    --gray-100: #f4f4f5;
    --gray-200: #e4e4e7;
    --gray-300: #d4d4d8;
    --gray-400: #a1a1aa;
    --gray-500: #6c757d;
    --gray-600: #52525b;
    --gray-700: #3f3f46;
    --gray-800: #27272a;
    --gray-900: #18181b;
    --gray-950: #111111;
  }

  html,
  body,
  #root {
    height: 100%;
  }

  body {
    /* 3. Add accessible line-height */
    line-height: 1.5;
    /* 4. Improve text rendering */
    -webkit-font-smoothing: antialiased;
  }

  /* 5. Improve media defaults */
  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  /* 6. Inherit fonts for form controls */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  /* 7. Avoid text overflows */
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }

  /*
    9. Create a root stacking context
  */
  #root,
  #__next {
    isolation: isolate;
  }

`;

export default GlobalStyles;
