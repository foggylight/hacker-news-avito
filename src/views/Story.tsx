import React, { ReactElement } from 'react';

import './App.css';

import { Container, Typography } from '@material-ui/core';
import { IStory } from '../models/StoryModel';

const Story = ({ id, score, by, descendants, time, title, url, kids = [] }: IStory): ReactElement => {
  return (
    <Container maxWidth='sm'>
      <Typography variant='h2' component='h2' gutterBottom>
        {title}
      </Typography>
    </Container>
  );
};

export default Story;
