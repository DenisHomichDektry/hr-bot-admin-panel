import { FC } from 'react';
import { Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { ICategory, IItem } from '~/store/api';
import { CustomSelect } from '~/components/molecules/CustomSelect';
import { useResponsive } from '~/hooks';

import { TItemEdit } from '../../types.ts';

const validationSchema = yup.object({
  title: yup.string().required('Title is required').max(512, 'Title must be at most 512 characters'),
  link: yup.string().required('Link is required').url('Invalid link format'),
});

interface IItemFormProps {
  item?: IItem | null;
  categories: ICategory[];
  currentCategory?: string;
  onSubmit: (item: TItemEdit) => void;
}

export const ItemForm: FC<IItemFormProps> = (props) => {
  const { item, categories, onSubmit, currentCategory } = props;
  const smUp = useResponsive({ query: 'up', start: 'sm' });

  const formik = useFormik({
    initialValues: {
      title: item?.title || '',
      link: item?.link || '',
      categoryId: currentCategory || '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (item) {
        onSubmit({ ...item, ...values });
      } else {
        onSubmit(values);
      }
    },
  });

  return (
    <Stack
      id="item-form"
      component="form"
      onSubmit={formik.handleSubmit}
      spacing={4}
      sx={{
        width: smUp ? '450px' : '100%',
        padding: '10px 0',
      }}>
      <TextField
        label="Title"
        {...formik.getFieldProps('title')}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
      />
      <TextField
        label="Link"
        {...formik.getFieldProps('link')}
        error={formik.touched.link && Boolean(formik.errors.link)}
        helperText={formik.touched.link && formik.errors.link}
      />
      <CustomSelect
        label="Category"
        options={categories || []}
        {...formik.getFieldProps('categoryId')}
        error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}
        helperText={formik.touched.categoryId && formik.errors.categoryId}
      />
    </Stack>
  );
};
