import React, { ReactElement, useEffect, useState } from 'react';

import './App.css';

import { Link, Route, Switch } from 'react-router-dom';
import { Container, Grid, Typography } from '@material-ui/core';
import Story from './Story';
import { getStoriesData } from '../api/getData';

enum Routes {
  main = '/',
  story = '/story',
}

const App = (): ReactElement => {
  const [storiesPages, updatePages] = useState((): JSX.Element[] => []);
  const [stories, updateData] = useState((): JSX.Element[] => []);

  useEffect(() => {
    getStoriesData().then(data => {
      const updatedStories = data.map(story => (
        <Link key={story.id} to={`/${story.id}`}>
          <Grid container>
            <Grid item>{story.title}</Grid>
          </Grid>
        </Link>
      ));
      updateData(updatedStories);
      const updatedPages = data.map(story => (
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
      updatePages(updatedPages);
    });
  }, []);

  return (
    <Container maxWidth='sm'>
      <Link to={Routes.main}>
        <Typography variant='h1'>Hacker News</Typography>
      </Link>
      <Switch>
        <Route exact path={Routes.main}>
          {stories}
        </Route>
        {storiesPages}
      </Switch>
    </Container>
  );
};

export default App;
