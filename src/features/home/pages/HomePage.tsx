import { memo, FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@mui/material';

const HomePageComponent: FC = () => (
  <>
    <h1>Home page</h1>
    <Button
      component={RouterLink}
      color="inherit"
      to="posts"
    >
      Posts
    </Button>
    <Button
      component={RouterLink}
      color="inherit"
      to="group"
    >
      Groups
    </Button>
  </>
);

export const HomePage = memo(HomePageComponent);
