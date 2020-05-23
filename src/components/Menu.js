import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { Link } from 'gatsby';

import MenuItems from '../menuItems';

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ theme }) => theme.colors.primaryLight};
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};

  @media (max-width: ${({ theme }) => theme.breakPointValues.xs}) {
    width: 100%;
  }

  a {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: ${({ theme }) => theme.colors.primaryDark};
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: ${({ theme }) => theme.breakPointValues.xs}) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: ${({ theme }) => theme.colors.primaryHover};
    }
  }
`;

const Menu = ({ open, theme }) => {
  return (
    <StyledMenu open={open}>
      {MenuItems.map(({ name, navigateTo }) => {
        if (name === 'home') return null;
        return (
          <Link
            to={navigateTo}
            activeStyle={{ color: theme.colors.secondaryLight }}
            key={name}
          >
            {name}
          </Link>
        );
      })}
    </StyledMenu>
  );
};

Menu.propTypes = {
  open: PropTypes.bool.isRequired,
  // eslint-disable-next-line
  theme: PropTypes.object,
};

export default withTheme(Menu);
