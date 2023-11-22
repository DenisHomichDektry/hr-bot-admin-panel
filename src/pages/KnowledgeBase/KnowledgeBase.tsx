import { Box, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';

const KnowledgeBase = () => {
  return (
    <>
      <Helmet>
        <title> Knowledge Base | HR Bot </title>
      </Helmet>
      <Box>
        <Typography>KnowledgeBase page</Typography>
      </Box>
    </>
  );
};

export default KnowledgeBase;
