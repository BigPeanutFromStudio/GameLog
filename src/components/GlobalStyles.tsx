// filepath: src/components/GlobalStyles.tsx
import { createGlobalStyle } from 'styled-components';
import {
  defaultTheme,
  preset1Theme,
  preset2Theme,
  preset3Theme,
} from '../theme/defaultTheme';

interface Props {
  theme:
    | typeof defaultTheme
    | typeof preset1Theme
    | typeof preset2Theme
    | typeof preset3Theme;
}

export const GlobalStyle = createGlobalStyle<Props>`
  body {
    font-family: ${(props) => props.theme.font}, serif;
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    margin: 0;
    padding: 0;
  }

  h1{
    font-size: var(--large-font);
  }
  h2{
    font-size: var(--medium-font);
  }
  h3{
    font-size: var(--small-font);
  }

  :root {
    --background-color: ${(props) => props.theme.colors.background};
    --text-color: ${(props) => props.theme.colors.text};
    --primary-color: ${(props) => props.theme.colors.primary};
    --secondary-color: ${(props) => props.theme.colors.secondary};
    --accent-color: ${(props) => props.theme.colors.accent};

    --small-font: 1.5rem;
    --medium-font: 2rem;
    --large-font: 2.5rem;
    --xlarge-font: 3rem;

    --border-radius: ${(props) => props.theme.borderRadius};

  }
`;
