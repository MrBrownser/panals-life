import styled from 'styled-components';

import breakpoints from '../breakpoints';

const { mediaQueries } = breakpoints;

const hidden = (key) => (props) =>
  props[key] && {
    [mediaQueries[key]]: {
      display: 'none',
    },
  };

const xs = hidden('xs');
const sm = hidden('sm');
const md = hidden('md');
const lg = hidden('lg');

const customQuery = (props) =>
  props.query && {
    [props.query]: {
      display: 'none',
    },
  };

const Hide = styled.div([], xs, sm, md, lg, customQuery);

export default Hide;
