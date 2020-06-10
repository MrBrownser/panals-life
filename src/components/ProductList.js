import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import { Box } from 'rebass/styled-components';

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
          }
        }
      }
    `}
    render={({ allContentfulProduct }) => {
      const { nodes = false } = allContentfulProduct;

      if (!nodes || !nodes.length) return null;

      return <div>{JSON.stringify(nodes)}</div>;
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
