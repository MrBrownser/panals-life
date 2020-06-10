import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import { Box } from 'rebass/styled-components';

const filterProducts = (nodes, selectedCategory) => {
  const { value: selectedCategoryId } = selectedCategory;

  return nodes.filter((product) => {
    const { categories } = product;
    return categories.some(
      (categoryObj) => categoryObj.id === selectedCategoryId,
    );
  });
};

const ProductList = ({ selectedCategory }) => (
  <StaticQuery
    query={graphql`
      {
        allContentfulProduct {
          nodes {
            productName {
              productName
            }
            productDescription {
              productDescription
            }
            sizetypecolor
            slug
            price
            categories {
              id
            }
          }
        }
      }
    `}
    render={({ allContentfulProduct }) => {
      const { nodes = false } = allContentfulProduct;

      if (!nodes || !nodes.length) return null;
      const filteredProducts = !selectedCategory
        ? nodes
        : filterProducts(nodes, selectedCategory);

      return <div>{JSON.stringify(filteredProducts, null, 4)}</div>;
    }}
  />
);

ProductList.propTypes = {
  selectedCategory: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  }),
};

export default ProductList;
