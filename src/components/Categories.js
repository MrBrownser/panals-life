import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import Select from 'react-select';
import { Box } from 'rebass/styled-components';

const CategoriesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

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
        <CategoriesContainer>
          <Box py="2em" width={[1, 1 / 2, 1 / 3]}>
            <Select
              name="categoriesPicker"
              options={options}
              value={selectedCategory}
              onChange={onCategoryChange}
              placeholder="Escoge categoría"
            />
          </Box>
        </CategoriesContainer>
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
