import React, { useEffect } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import { ScrollingProvider } from 'react-scroll-section';
import config from 'react-reveal/globals';
import preset from '@rebass/preset';

import Navigation from '../components/Navigation';
import Footer from '../components/Footer'; // TODO: Create and put it into the layout!
import Helmet from './Helmet';
import colors from '../colors';
import breakpoints from '../breakpoints';

const GlobalStyle = createGlobalStyle`
  *,
  *::after,
  *::before { 
    box-sizing: inherit;
    }

  body {
    box-sizing: border-box; 
    margin: 0;
    font-family: Cabin, 'Open Sans', sans-serif;
    overflow-x: hidden;
    width: 100vw;
  }
`;

config({ ssrFadeout: true });

const loadScript = (src) => {
  const tag = document.createElement('script');
  tag.src = src;
  tag.defer = true;

  document.getElementsByTagName('body')[0].appendChild(tag);
};

const theme = {
  ...preset,
  colors,
  ...breakpoints,
  fonts: {
    body: 'Cabin, Open Sans, sans-serif',
    heading: 'inherit',
    monospace: 'monospace',
  },
};

const Layout = ({ children }) => {
  useEffect(() => {
    loadScript('https://use.fontawesome.com/fd58d214b9.js');
  }, []);

  return (
    <main>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <ScrollingProvider>
          <Helmet />
          <Navigation>{children}</Navigation>
        </ScrollingProvider>
      </ThemeProvider>
    </main>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
