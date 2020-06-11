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

const groupProducts = (allProducts) => {
  return allProducts.reduce((acc, currentItem) => {
    if (acc.length === 0) return [currentItem];
    const itemIndex = acc.findIndex((item) => item.slug === currentItem.slug);
    if (itemIndex === -1) return [...acc, currentItem];
    const addToThisItem = acc[itemIndex];
    if (typeof addToThisItem.sizetypecolor === 'string') {
      // We have to convert that string into an array of all colors
      addToThisItem.sizetypecolor = [
        addToThisItem.sizetypecolor,
        currentItem.sizetypecolor,
      ];
      return acc;
    }
    // It's already an array
    addToThisItem.sizetypecolor.push(currentItem.sizetypecolor);
    return acc;
  }, []);
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

      const groupedProducts = groupProducts(filteredProducts);

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
