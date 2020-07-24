import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import { Box, Heading } from 'rebass/styled-components';
import Fade from 'react-reveal/Fade';

import { CardContainer, Card } from './Card';
import ImageSubtitle from './ImageSubtitle';

const EllipsisHeading = styled(Heading)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-inline-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  border-bottom: ${(props) => props.theme.colors.primary} 5px solid;
`;

const CoverImage = styled.img`
  width: 100%;
  object-fit: contain;
`;

const ProductCard = ({
  product: {
    productName: { productName: name },
    price,
    image: images,
  },
}) => {
  const image = images[Math.floor(Math.random() * images.length)].fixed.src;

  return (
    <a
      href="/404"
      target="__blank"
      title={name}
      style={{ textDecoration: 'none' }}
    >
      <Card pb={4}>
        <EllipsisHeading m={3} p={1} color="text">
          {name}
        </EllipsisHeading>
        {image && <CoverImage src={image} height="200px" alt={name} />}
        <ImageSubtitle bg="primary" color="white" x="right" y="bottom" round>
          {`${price}€`}
        </ImageSubtitle>
      </Card>
    </a>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    productName: PropTypes.shape({
      productName: PropTypes.string,
    }),
    price: PropTypes.number,
    image: PropTypes.arrayOf({
      fixed: PropTypes.shape({
        src: PropTypes.string,
      }),
    }),
  }).isRequired,
};

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
    addToThisItem.image.push(...currentItem.image);
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
            image {
              fixed {
                src
              }
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

      return (
        <Box width={[2 / 3]} m="auto">
          <CardContainer minWidth="300px">
            {groupedProducts.map((product) => (
              <Fade bottom key={product.slug}>
                <ProductCard product={product} />
              </Fade>
            ))}
          </CardContainer>
        </Box>
      );
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
