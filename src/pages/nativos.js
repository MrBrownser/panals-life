import React from 'react';
import Layout from '../components/Layout';
import About from '../sections/About';
import Header from '../components/Header';
import Footer from '../components/Footer';

const IndexPage = () => (
  <Layout>
    <Header />
    <About />
    <Footer />
  </Layout>
);

export default IndexPage;
