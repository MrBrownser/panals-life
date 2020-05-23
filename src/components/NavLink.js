import React from 'react';
import { Box } from 'rebass/styled-components';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import LinkAnimated from './LinkAnimated';
import colors from '../colors';

const getStyle = (name) => {
  if (!name) return null;
  return { borderBottom: `5px solid ${colors.primaryLight}` };
};

const NavLink = ({ navigateTo, name, children }) => (
  <Box px={[2, 3]} color="background" fontSize={[2, 3]}>
    <Link to={navigateTo} activeStyle={getStyle(name)}>
      <LinkAnimated>{name || children}</LinkAnimated>
    </Link>
  </Box>
);

NavLink.propTypes = {
  name: PropTypes.string,
  navigateTo: PropTypes.string,
  children: PropTypes.node,
};

export default NavLink;
