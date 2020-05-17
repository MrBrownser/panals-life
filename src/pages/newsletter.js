import React from 'react';
import Layout from '../components/Layout';
import Newsletter from '../sections/Newsletter';
import Header from '../components/Header';
import Footer from '../components/Footer';

const IndexPage = () => (
  <Layout>
    <Header />
    <Newsletter />
    <Footer />
  </Layout>
);

export default IndexPage;
