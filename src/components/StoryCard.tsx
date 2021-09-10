import React, { ReactElement } from 'react';

import { Card, CardContent, CardHeader, Grid, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { IStory } from '../models/storyModel';
import { getDate } from '../utils';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#fff',
  },
  content: {
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '0 16px 16px',
    fontSize: 14,
    '&:last-child': {
      paddingBottom: '16px',
    },
  },
  text: {
    margin: '0 15px 0 0',
  },
  title: {
    fontSize: 18,
  },
});

const StoryCard = ({ id, score, by, time, title }: IStory): ReactElement => {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <Card className={classes.root}>
        <Link to={`/${id}`}>
          <CardHeader disableTypography title={title} className={classes.title} />
        </Link>
        <CardContent className={classes.content}>
          <Typography className={classes.text}>{score} point</Typography>
          <Typography className={classes.text}>by {by}</Typography>
          <Typography className={classes.text}>published: {getDate(time)}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default StoryCard;
