import React, { ReactElement, useEffect } from 'react';
import { Button, Container, Grid, Link, makeStyles, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { IStory } from '../models/storyModel';
import { getDate } from '../utils';
import { fetchComments } from '../store/reducer';
import { IStore } from '../models/storeModel';
import Comment from '../components/Comment';

const useStyles = makeStyles({
  subtitle: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '30px',
  },
  comment: {
    padding: '15px',
  },
  commentSubtitle: {
    color: '#555555',
  },
  commentBody: {
    margin: '10px 0 15px',
  },
});

const Story = ({ by, time, title, url, kids = [] }: IStory): ReactElement => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const comments = useSelector((state: IStore) => state.comments);

  useEffect(() => {
    if (kids.length === 0) {
      return () => {};
    }
    const updateInterval = setInterval(() => dispatch(fetchComments(kids)), 60000);
    return () => clearInterval(updateInterval);
  }, []);

  useEffect(() => {
    if (kids.length !== 0) {
      dispatch(fetchComments(kids));
    }
  }, []);

  const updateCommentsBtn = (
    <Button onClick={() => dispatch(fetchComments(kids))} variant='contained' color='primary'>
      Update comments
    </Button>
  );

  const commentsList = comments.map(comment =>
    comment.deleted ? (
      ''
    ) : (
      <Comment key={comment.id} by={comment.by} time={comment.time} text={comment.text} kidsData={comment.kidsData} />
    ),
  );

  return (
    <Container maxWidth='md'>
      <Typography variant='h5' component='h2' gutterBottom>
        {title}
      </Typography>
      <Container maxWidth='md' className={classes.subtitle}>
        <Link href={url} display='block'>
          Read the article
        </Link>
        <Typography variant='subtitle2' display='inline' gutterBottom>
          by {by}
        </Typography>
        <Typography variant='subtitle2' display='inline' gutterBottom>
          published: {getDate(time)}
        </Typography>
      </Container>
      {updateCommentsBtn}
      <Grid container spacing={1}>
        {commentsList}
      </Grid>
    </Container>
  );
};

export default Story;
