import React, { ReactElement, useState } from 'react';
import { Box, Button, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import parse from 'html-react-parser';

import { getDate } from '../utils';
import { IComment } from '../models/commentModel';

const useStyles = makeStyles({
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

const Comment = ({ by, time, text, kidsData = [] }: IComment): ReactElement => {
  const classes = useStyles();

  const [isCommentsOpen, openComments] = useState(false);

  const link = (
    <Button size='small' color='primary' onClick={() => openComments(!isCommentsOpen)}>
      {isCommentsOpen ? 'Hide comments' : 'Show comments'}
    </Button>
  );

  const subComments = (subKids: IComment[]) => (
    <Grid container spacing={1}>
      {subKids.map(kid =>
        kid.deleted ? (
          ''
        ) : (
          <Comment
            key={kid.id}
            by={kid.by}
            deleted={kid.deleted}
            time={kid.time}
            text={kid.text}
            kidsData={kid.kidsData}
          />
        ),
      )}
    </Grid>
  );

  return (
    <Grid item>
      <Box className={classes.comment}>
        <Typography variant='subtitle2' gutterBottom className={classes.commentSubtitle}>
          by {by}
        </Typography>
        <Typography variant='subtitle2' gutterBottom className={classes.commentSubtitle}>
          send: {getDate(time)}
        </Typography>
        <Divider />
        <Box className={classes.commentBody}>{parse(text)}</Box>
        {kidsData.length !== 0 ? link : ''}
        {isCommentsOpen ? subComments(kidsData) : ''}
      </Box>
    </Grid>
  );
};

export default Comment;
