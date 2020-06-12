import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import { Box } from 'rebass/styled-components';
import Fade from 'react-reveal/Fade';

import { CardContainer, Card } from '../components/Card';

// Imitar cómo crea el Post pero haciendo mi ProductCard
// const Post = ({ title, text, image, url, date, time }) => (
//   <a
//     href={url}
//     target="__blank"
//     title={title}
//     style={{ textDecoration: 'none' }}
//   >
//     <Card pb={4}>
//       <EllipsisHeading m={3} p={1} color="text">
//         {title}
//       </EllipsisHeading>
//       {image && <CoverImage src={image} height="200px" alt={title} />}
//       <Text m={3} color="text">
//         {text}
//       </Text>
//       <ImageSubtitle bg="primary" color="white" x="right" y="bottom" round>
//         {`${date} - ${Math.ceil(time)} min`}
//       </ImageSubtitle>
//     </Card>
//   </a>
// );

// Post.propTypes = {
//   title: PropTypes.string.isRequired,
//   text: PropTypes.string.isRequired,
//   image: PropTypes.string.isRequired,
//   url: PropTypes.string.isRequired,
//   date: PropTypes.string.isRequired,
//   time: PropTypes.number.isRequired,
// };

const ProductCard = (product) => {
  return (
    <Card>
      <p>{JSON.stringify(product)}</p>
    </Card>
  );
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

      // return <div>{JSON.stringify(filteredProducts, null, 4)}</div>;

      return (
        <CardContainer minWidth="300px">
          {groupedProducts.map((product) => (
            <Fade bottom key={product.slug}>
              <ProductCard product={product} />
            </Fade>
          ))}
        </CardContainer>
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
