import React, { useState } from 'react';
import Layout from '../components/Layout';
import Categories from '../components/Categories';

const IndexPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const updateCategory = (category) => setSelectedCategory(category);

  return (
    <Layout>
      <Categories
        selectedCategory={selectedCategory}
        onCategoryChange={updateCategory}
      />
    </Layout>
  );
};

export default IndexPage;
