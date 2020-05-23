const breakPointValues = {
  xs: '40em',
  sm: '52em',
  md: '64em',
};

const mediaQueries = {
  xs: `@media screen and (max-width: ${breakPointValues.xs})`,
  sm: `@media screen and (min-width: ${breakPointValues.xs}) and (max-width: ${breakPointValues.sm})`,
  md: `@media screen and (min-width: ${breakPointValues.sm}) and (max-width: ${breakPointValues.md})`,
  lg: `@media screen and (min-width: ${breakPointValues.md})`,
};

export default { mediaQueries, breakPointValues };
