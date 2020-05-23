import React, { useState, useRef } from 'react';
import Headroom from 'react-headroom';
import styled from 'styled-components';
import { Flex, Image } from 'rebass/styled-components';
import Fade from 'react-reveal/Fade';
import Hide from './Hide';

import MenuItems from '../menuItems';
import NavLink from './NavLink';
import Logo from './Logo/PanalsLife.svg';
import Burguer from './Burguer';
import Menu from './Menu';
import { useOnClickOutside } from '../hooks';

const HeaderContainer = styled(Headroom)`
  .headroom--pinned {
    background: ${({ theme }) => theme.colors.primaryDark};
  }

  position: absolute;
  width: 100%;

  a {
    text-decoration: none;
  }
`;

const Header = () => {
  const [open, setOpen] = useState(false);

  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));

  const navLinks = MenuItems.map((item) => {
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
      <Hide xs key={name}>
        <NavLink navigateTo={navigateTo} name={name} />
      </Hide>
    );
  });

  return (
    <HeaderContainer>
      <Fade top>
        <Flex justifyContent="center" alignItems="center" p={4}>
          <>{navLinks}</>
        </Flex>
      </Fade>
      <Hide sm md lg ref={node}>
        <Burguer open={open} setOpen={setOpen} />
        <Menu open={open} setOpen={setOpen} />
      </Hide>
    </HeaderContainer>
  );
};

export default Header;
