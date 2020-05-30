import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { Box } from 'rebass/styled-components';
import Select from 'react-select';

const adaptOptions = (nodes) => {
  return nodes.map(({ id, title: { title } }) => ({ value: id, label: title }));
};

const Categories = ({ selectedCategory, onCategoryChange }) => (
  <StaticQuery
    query={graphql`
      query CategoriesQuery {
        allContentfulCategory(sort: { fields: order, order: ASC }) {
          nodes {
            id
            title {
              title
            }
            order
          }
        }
      }
    `}
    render={({ allContentfulCategory }) => {
      const { nodes = false } = allContentfulCategory;

      if (!nodes || !nodes.length) return null;
      const options = adaptOptions(nodes);

      return (
        <Box>
          <Select
            name="categoriesPicker"
            options={options}
            value={selectedCategory}
            onChange={onCategoryChange}
            placeholder="Categorías"
          />
        </Box>
      );
    }}
  />
);

Categories.propTypes = {
  selectedCategory: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  }),
  onCategoryChange: PropTypes.func.isRequired,
};

export default Categories;
