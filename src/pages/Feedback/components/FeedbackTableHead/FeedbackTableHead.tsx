import { FC } from 'react';
import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';

import { IHeadLabel } from '~/pages/UserManagement/types';

interface IFeedbackTableHeadProps {
  // order: 'asc' | 'desc';
  // orderBy: string;
  headLabel: IHeadLabel[];
  // onRequestSort: (event: MouseEvent<unknown>, property: string) => void;
}

// TODO: add sorting
export const FeedbackTableHead: FC<IFeedbackTableHeadProps> = (props) => {
  const {
    // no sorting for now
    // order,
    // orderBy,
    headLabel,
    // onRequestSort,
  } = props;

  // const onSort = (property: string) => (event: MouseEvent) => {
  //   onRequestSort(event, property);
  // };

  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align || 'left'}
            // sortDirection={orderBy === headCell.id ? order : false}
            sx={{ width: headCell.width, minWidth: headCell.minWidth }}>
            <TableSortLabel
              hideSortIcon
              // active={orderBy === headCell.id}
              // direction={orderBy === headCell.id ? order : 'asc'}
              // onClick={onSort(headCell.id)}
            >
              {headCell.label}
              {/*{orderBy === headCell.id ? (*/}
              {/*  <Box sx={{ ...visuallyHidden }}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box>*/}
              {/*) : null}*/}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
