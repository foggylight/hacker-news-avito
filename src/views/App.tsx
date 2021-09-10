import React, { ReactElement, useEffect } from 'react';

import './App.css';

import { NavLink, Route, Switch, useLocation } from 'react-router-dom';
import { AppBar, Button, Container, Grid, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Story from './Story';
import { IStore } from '../models/storeModel';
import { fetchStories } from '../store/reducer';
import StoryCard from '../components/StoryCard';

const useStyles = makeStyles({
  header: {
    margin: '0 0 30px',
    borderRadius: '5px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

const App = (): ReactElement => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const location = useLocation();

  const stories = useSelector((state: IStore) => state.stories);

  useEffect(() => {
    const updateInterval = setInterval(() => dispatch(fetchStories()), 60000);
    return () => clearInterval(updateInterval);
  }, []);

  useEffect(() => {
    dispatch(fetchStories());
  }, []);

  const links = stories.map(story => (
    <StoryCard
      key={story.id}
      id={story.id}
      by={story.by}
      score={story.score}
      time={story.time}
      title={story.title}
      url={story.url}
      kids={story.kids}
    />
  ));

  const pages = stories.map(story => (
    <Route exact key={story.id} path={`/${story.id}`}>
      <Story
        id={story.id}
        by={story.by}
        score={story.score}
        time={story.time}
        title={story.title}
        url={story.url}
        kids={story.kids}
      />
    </Route>
  ));

  const updateNewsBtn = (
    <Button onClick={() => dispatch(fetchStories())} variant='contained' color='primary'>
      Update news
    </Button>
  );

  return (
    <Container maxWidth='md'>
      <AppBar position='sticky' color='inherit' className={classes.header}>
        <Toolbar className={classes.toolbar}>
          <NavLink to='/'>
            <Typography variant='h6'>{location.pathname === '/' ? 'Hacker News' : 'Back to news'}</Typography>
          </NavLink>
          {location.pathname === '/' ? updateNewsBtn : ''}
        </Toolbar>
      </AppBar>
      {stories.length === 0 ? <Typography variant='h6'>Please wait, news are updating!</Typography> : ''}
      <Switch>
        <Route exact path='/'>
          <Grid container spacing={3}>
            {links}
          </Grid>
        </Route>
        {pages}
      </Switch>
    </Container>
  );
};

export default App;
