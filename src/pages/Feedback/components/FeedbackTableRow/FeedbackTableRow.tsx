import { FC } from 'react';
import { TableRow, TableCell } from '@mui/material';

import { MAX_FEEDBACK_SCORE } from '~/constants';

interface IFeedbackTableRowProps {
  name: string;
  score: number;
  details?: string;
}

export const FeedbackTableRow: FC<IFeedbackTableRowProps> = (props) => {
  const { name, score, details = '—' } = props;

  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell>{name}</TableCell>
        <TableCell>{renderScore(score)}</TableCell>
        <TableCell>{details}</TableCell>
      </TableRow>
    </>
  );
};

const renderScore = (score: number) => {
  const stars = [];
  for (let i = 0; i < score; i++) {
    stars.push('⭐️');
  }
  for (let i = 0; i < MAX_FEEDBACK_SCORE - score; i++) {
    stars.push('☆');
  }
  return stars.join('');
};
