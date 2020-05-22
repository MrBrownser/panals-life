import React, { Fragment } from 'react';
import Headroom from 'react-headroom';
import styled from 'styled-components';
import { Flex, Image } from 'rebass/styled-components';
import Fade from 'react-reveal/Fade';
import Hide from './Hide';

import NavLink from './NavLink';
import Logo from './Logo/PanalsLife.svg';

const HeaderContainer = styled(Headroom)`
  .headroom--pinned {
    background: ${(props) => props.theme.colors.primaryDark};
  }

  position: absolute;
  width: 100%;
`;

const menuItems = [
  {
    name: 'tienda',
    navigateTo: '/',
  },
  {
    name: 'newsletter',
    navigateTo: '/newsletter',
  },
  {
    name: 'home',
    navigateTo: '/',
  },
  {
    name: 'nativos',
    navigateTo: '/nativos',
  },
  {
    name: 'contacta',
    navigateTo: '/contacta',
  },
];

// Existing breakpoints:
// xs: '@media screen and (max-width: 40em)',
// sm: '@media screen and (min-width: 40em) and (max-width: 52em)',
// md: '@media screen and (min-width: 52em) and (max-width: 64em)',
// lg: '@media screen and (min-width: 64em)',

const Header = () => {
  const navLinks = menuItems.map((item) => {
    const { navigateTo, name } = item;
    if (name === 'home') {
      return (
        <NavLink navigateTo={navigateTo} key={name}>
          <Image
            src={Logo}
            width={['17em', '15em']}
            px={[2, 3]}
            alt="Panals Life. Logo"
            style={{
              cursor: 'pointer',
            }}
          />
        </NavLink>
      );
    }
    return (
      <Hide xs>
        <NavLink navigateTo={navigateTo} key={name} name={name} />
      </Hide>
    );
  });

  return (
    <HeaderContainer>
      <Fade top>
        <Flex justifyContent="center" alignItems="center" p={4}>
          <Fragment>{navLinks}</Fragment>
        </Flex>
      </Fade>
    </HeaderContainer>
  );
};

export default Header;
