import { FC } from 'react';
import { MenuItem, SelectChangeEvent, TextField } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField/TextField';

interface ICustomSelectProps {
  label: string;
  options: {
    id: string;
    name: string;
  }[];
}

export const CustomSelect: FC<ICustomSelectProps & TextFieldProps> = ({ label, options, ...rest }) => {
  return (
    <TextField label={label} select {...rest}>
      {options.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          {option.name}
        </MenuItem>
      ))}
    </TextField>
  );
};
