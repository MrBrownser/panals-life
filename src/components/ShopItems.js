import React, { Fragment } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Heading, Flex, Box } from 'rebass/styled-components';
import { SectionLink } from 'react-scroll-section';

import SocialLink from './SocialLink';
import MouseIcon from './MouseIcon';

const ShopItems = () => (
  <>
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          contentfulAbout {
            name
            socialLinks {
              id
              url
              name
              fontAwesomeIcon
            }
          }
        }
      `}
      render={({ contentfulAbout }) => {
        const { name, socialLinks } = contentfulAbout;

        console.log("HEY I'M AT SHOPITEMS!!");

        return (
          <Fragment>
            <Heading
              textAlign="center"
              as="h1"
              color="primary"
              fontSize={[6, 7]}
              mb={[3, 4, 5]}
            >
              {`Hello, we are ${name}!`}
            </Heading>
            <Flex alignItems="center" justifyContent="center" flexWrap="wrap">
              {socialLinks.map(({ id, ...rest }) => (
                <Box mx={3} fontSize={[5, 6, 6]} key={id}>
                  <SocialLink {...rest} />
                </Box>
              ))}
            </Flex>
            <SectionLink section="about">
              {({ onClick }) => <MouseIcon onClick={onClick} />}
            </SectionLink>
          </Fragment>
        );
      }}
    />
  </>
);

export default ShopItems;