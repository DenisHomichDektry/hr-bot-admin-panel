import { FC, memo } from 'react';
import { Button, Card, Grid, Grow, Link, Stack, Typography } from '@mui/material';

interface IItemCardProps {
  title: string;
  link: string;
  onEdit?: () => void;
  onDelete?: () => void;
}
export const ItemCard: FC<IItemCardProps> = memo(({ title, link, onEdit, onDelete }) => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Grow in>
        <Card
          sx={{
            height: '140px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <Stack p={2} pb={0} spacing={2}>
            <Typography fontWeight={700} noWrap>
              {title}
            </Typography>

            <Link
              color="inherit"
              rel="noreferrer"
              target="_blank"
              underline="hover"
              href={link}
              sx={{
                overflow: 'hidden',
              }}>
              <Typography noWrap>{link}</Typography>
            </Link>
          </Stack>
          <Stack p={1} direction="row" alignItems="center" justifyContent="flex-end">
            <Button onClick={onEdit}>Edit</Button>
            <Button onClick={onDelete} color="error">
              Delete
            </Button>
          </Stack>
        </Card>
      </Grow>
    </Grid>
  );
});
