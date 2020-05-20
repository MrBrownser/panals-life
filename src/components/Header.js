import React, { Fragment } from 'react';
import Headroom from 'react-headroom';
import styled from 'styled-components';
import { Flex, Image } from 'rebass/styled-components';
import Fade from 'react-reveal/Fade';
import RouteLink from './RouteLink';
import Logo from './Logo/PanalsLife.svg';

const HeaderContainer = styled(Headroom)`
  .headroom--pinned {
    background: ${(props) => props.theme.colors.primaryDark};
  }

  position: absolute;
  width: 100%;
`;

// const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);
// Use HIDE component to display the burguer menu! Check if it was done before (maybe)

const menuItems = [
  {
    name: 'tienda',
    value: {
      onClick: (smth) => console.log('tienda onClick smth', smth),
      isSelected: (smth) => console.log('tienda isSelected smth', smth),
    },
  },
  {
    name: 'newsletter',
    value: {
      onClick: (smth) => console.log('newsletter onClick smth', smth),
      isSelected: (smth) => console.log('newsletter isSelected smth', smth),
    },
  },
  {
    name: 'home',
    value: {
      onClick: (smth) => console.log('home onClick smth', smth),
      isSelected: (smth) => console.log('home isSelected smth', smth),
    },
  },
  {
    name: 'nativos',
    value: {
      onClick: (smth) => console.log('nativos onClick smth', smth),
      isSelected: (smth) => console.log('nativos isSelected smth', smth),
    },
  },
  {
    name: 'contacta',
    value: {
      onClick: (smth) => console.log('contacta onClick smth', smth),
      isSelected: (smth) => console.log('contacta isSelected smth', smth),
    },
  },
];

// Existing breakpoints:
// xs: '@media screen and (max-width: 40em)',
// sm: '@media screen and (min-width: 40em) and (max-width: 52em)',
// md: '@media screen and (min-width: 52em) and (max-width: 64em)',
// lg: '@media screen and (min-width: 64em)',

const Header = () => {
  const navLinks = menuItems.map((item) => {
    const { name, value } = item;
    if (name === 'home') {
      return (
        <Image
          src={Logo}
          width={['30%', '20%']}
          px={[2, 3]}
          alt="Panals Life. Logo"
          onClick={value.onClick}
          style={{
            cursor: 'pointer',
          }}
        />
      );
    }
    return (
      <RouteLink
        key={name}
        onClick={value.onClick}
        selected={value.isSelected}
        name={name}
      />
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
