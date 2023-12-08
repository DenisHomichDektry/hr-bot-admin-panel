import { FC } from 'react';
import { MenuItem, Typography, TextField } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField/TextField';

import { useResponsive } from '~/hooks';

interface ICustomSelectProps {
  label: string;
  options: {
    id: string;
    name: string;
  }[];
}

export const CustomSelect: FC<ICustomSelectProps & TextFieldProps> = ({ label, options, ...rest }) => {
  const smUp = useResponsive({ query: 'up', start: 'sm' });

  return (
    <TextField label={label} select {...rest}>
      {options.map((option) => (
        <MenuItem key={option.id} value={option.id} sx={{ maxWidth: smUp ? '40vw' : 'auto' }}>
          <Typography noWrap>{option.name}</Typography>
        </MenuItem>
      ))}
    </TextField>
  );
};
