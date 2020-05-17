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

const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);

const menuItems = [
  // Tienda
  {
    name: 'tienda',
    value: {
      onClick: (smth) => console.log('tienda onClick smth', smth),
      isSelected: (smth) => console.log('tienda isSelected smth', smth),
    },
  },
  // Newsletter
  {
    name: 'newsletter',
    value: {
      onClick: (smth) => console.log('newsletter onClick smth', smth),
      isSelected: (smth) => console.log('newsletter isSelected smth', smth),
    },
  },
  // LOGO
  {
    name: 'home',
    value: {
      onClick: (smth) => console.log('home onClick smth', smth),
      isSelected: (smth) => console.log('home isSelected smth', smth),
    },
  },
  // Nativos
  {
    name: 'nativos',
    value: {
      onClick: (smth) => console.log('nativos onClick smth', smth),
      isSelected: (smth) => console.log('nativos isSelected smth', smth),
    },
  },
  // Contacta
  {
    name: 'contacta',
    value: {
      onClick: (smth) => console.log('contacta onClick smth', smth),
      isSelected: (smth) => console.log('contacta isSelected smth', smth),
    },
  },
];

// For the HOME link we should put this one instead
{
  /* <Image
                src={Logo}
                width="50px"
                alt="Portfolio Logo"
                onClick={home.onClick}
                style={{
                  cursor: 'pointer',
                }}
              /> */
}

const Header = () => {
  const navLinks = menuItems.map((item) => {
    const { name, value } = item;
    console.log('name', name);
    console.log('value', value);
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
        <Flex
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
          p={3}
        >
          <Fragment>
            <Flex mr={[0, 3, 5]}>{navLinks}</Flex>
          </Fragment>
        </Flex>
      </Fade>
    </HeaderContainer>
  );
};

export default Header;
