import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Typography } from '@mui/material';

import { useCategoriesQuery, useItemsQuery } from '~/store/api';
import { useIsFetching } from '~/hooks';

import { Header, ItemGrid } from './components';

const KnowledgeBase = () => {
  // console.count('KnowledgeBase');

  const [currentCategory, setCurrentCategory] = useState('');

  const { data: categories, isFetching: isFetchingCategories, isLoading: isLoadingCategories } = useCategoriesQuery();
  const { currentData: items, isFetching: isFetchingItems } = useItemsQuery(currentCategory, {
    skip: !currentCategory,
  });
  useIsFetching(isFetchingCategories, isFetchingItems);

  // select first category as default
  useEffect(() => {
    if (categories?.length && !currentCategory) {
      setCurrentCategory(categories[0].id);
    }
  }, [categories]);

  const displayCategoriesSelect = !isLoadingCategories && !!categories!.length;

  return (
    <>
      <Helmet>
        <title> Knowledge Base | HR Bot </title>
      </Helmet>
      <Container>
        <Header
          categories={categories}
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
          displayCategoriesSelect={displayCategoriesSelect}
        />
        {categories?.length ? (
          <ItemGrid items={items} categories={categories} currentCategory={currentCategory} />
        ) : isLoadingCategories ? null : (
          <Stack alignItems="center" justifyContent="center">
            <Typography variant="h6">No categories</Typography>
          </Stack>
        )}
      </Container>
    </>
  );
};

export default KnowledgeBase;
