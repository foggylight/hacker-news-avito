import React, { ReactElement, useEffect } from 'react';

import './App.css';

import { Link, Route, Switch } from 'react-router-dom';
import { AppBar, Button, Container, Grid, Toolbar, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Story from './Story';
import { IStore } from '../models/storeModel';
import { fetchStories } from '../store/storiesReducer';

const App = (): ReactElement => {
  const dispatch = useDispatch();

  const stories = useSelector((state: IStore) => state.stories);

  useEffect(() => {
    const updateInterval = setInterval(() => dispatch(fetchStories()), 60000);
    return () => clearInterval(updateInterval);
  }, []);

  useEffect(() => {
    dispatch(fetchStories());
  }, []);

  const links = stories.map(story => (
    <Link key={story.id} to={`/${story.id}`}>
      <Grid container>
        <Grid item>{story.title}</Grid>
      </Grid>
    </Link>
  ));

  const pages = stories.map(story => (
    <Route exact key={story.id} path={`/${story.id}`}>
      <Story
        id={story.id}
        by={story.by}
        descendants={story.descendants}
        score={story.score}
        time={story.time}
        title={story.title}
        url={story.url}
        kids={story.kids}
      />
    </Route>
  ));

  return (
    <Container maxWidth='sm'>
      <AppBar position='static'>
        <Toolbar>
          <Link to='/'>
            <Typography variant='h6'>Hacker News</Typography>
          </Link>
          <Button onClick={() => dispatch(fetchStories())}>Update news</Button>
        </Toolbar>
      </AppBar>
      {stories.length === 0 ? <Typography variant='h6'>Please wait, news are updating!</Typography> : ''}
      <Switch>
        <Route exact path='/'>
          {links}
        </Route>
        {pages}
      </Switch>
    </Container>
  );
};

export default App;
