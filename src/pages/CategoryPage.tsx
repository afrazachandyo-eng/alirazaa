import React from 'react';
import { useParams } from 'react-router-dom';
import Shop from './Shop';

const CategoryPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    return <Shop initialFilter={slug} />;
};

export default CategoryPage;
