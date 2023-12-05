import { ChangeEvent, FC, memo, useCallback, useState } from 'react';
import { IconButton, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { ICategory } from '~/store/api';
import { useResponsive } from '~/hooks';
import { Iconify } from '~/components/atoms/Iconify';
import { Scrollbar } from '~/components/atoms/Scrollbar';
import { useAppDispatch } from '~/store';
import { scheduleAlert } from '~/store/alert';
import { MESSAGES } from '~/constants';

const validationSchema = yup.object().shape({
  fields: yup.array().of(
    yup.object().shape({
      name: yup.string().required('Title is required').max(512, 'Title must be at most 512 characters'),
    }),
  ),
  newField: yup.string().max(512, 'Title must be at most 512 characters'),
});

interface ICategoryFormProps {
  categories: ICategory[];
  onSubmit: (newCategories: ICategory[]) => void;
}

export const CategoryForm: FC<ICategoryFormProps> = (props) => {
  const { categories, onSubmit } = props;
  const smUp = useResponsive({ query: 'up', start: 'sm' });
  const dispatch = useAppDispatch();

  const [showWarning, setShowWarning] = useState(false);

  const formik = useFormik({
    initialValues: {
      fields: categories,
      newField: '',
    },
    validationSchema,
    onSubmit: (values) => {
      if (formik.dirty) onSubmit(values.fields);
    },
  });

  const handleFieldChange = useCallback((index: number, e: ChangeEvent) => {
    formik.handleChange(e);
    formik.setFieldTouched(`fields[${index}].name`, true, false);
  }, []);

  const handleDelete = useCallback(
    (index: number) => {
      formik.setFieldValue(
        'fields',
        formik.values.fields.filter((_, i) => i !== index),
      );

      if (!showWarning) {
        setShowWarning(true);
        dispatch(scheduleAlert(MESSAGES.WARNING_ON_CATEGORY_DELETE));
      }
    },
    [formik.values.fields],
  );

  const handleAdd = () => {
    formik.setFieldValue('fields', [...formik.values.fields, { name: formik.values.newField }]);
    formik.setFieldValue('newField', '');
  };

  const getError = useCallback(
    (index: number) => {
      return formik.touched.fields?.[index]?.name && Boolean((formik.errors.fields?.[index] as { name: string })?.name);
    },
    [formik.errors.fields],
  );

  const getHelperText = useCallback(
    (index: number) => {
      return formik.touched.fields?.[index]?.name && (formik.errors.fields?.[index] as { name: string })?.name;
    },
    [formik.errors.fields],
  );

  return (
    <Stack
      id="category-form"
      component="form"
      sx={{
        width: smUp ? '450px' : '100%',
        padding: '10px 0',
      }}
      gap={4}
      justifyItems="space-between"
      onSubmit={formik.handleSubmit}>
      <Scrollbar sx={{ maxHeight: '65vh' }}>
        <Stack gap={4}>
          {formik.values.fields.map((category, index) => (
            <Row
              key={index}
              index={index}
              value={category.name}
              onChange={handleFieldChange}
              getError={getError}
              getHelperText={getHelperText}
              onDelete={handleDelete}
            />
          ))}
        </Stack>
      </Scrollbar>
      <Stack
        sx={{
          width: '100%',
        }}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap={2}>
        <TextField
          fullWidth
          name="newField"
          value={formik.values.newField}
          onChange={formik.handleChange}
          error={formik.touched.newField && Boolean(formik.errors.newField)}
          helperText={formik.touched.newField && formik.errors.newField}
        />
        <IconButton disabled={!formik.values.newField} onClick={handleAdd}>
          <Iconify icon="ic:round-add" />
        </IconButton>
      </Stack>
    </Stack>
  );
};

interface IRow {
  index: number;
  value: string;
  onDelete: (index: number) => void;
  onChange: (index: number, e: ChangeEvent) => void;
  getError: (index: number) => boolean | undefined;
  getHelperText: (index: number) => string | false | undefined;
}

const Row: FC<IRow> = memo((props) => {
  const { index, value, onDelete, onChange, getError, getHelperText } = props;

  return (
    <Stack
      key={index}
      sx={{
        width: '100%',
      }}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      gap={2}>
      <TextField
        fullWidth
        name={`fields[${index}].name`}
        value={value}
        onChange={(e) => onChange(index, e)}
        error={getError(index)}
        helperText={getHelperText(index)}
      />
      <IconButton onClick={() => onDelete(index)}>
        <Iconify icon="ic:round-delete" />
      </IconButton>
    </Stack>
  );
});
