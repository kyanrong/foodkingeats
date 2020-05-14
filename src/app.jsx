import React from 'react';

import { Route } from 'react-router';
import { Switch } from 'react-router-dom';

import { AddPage, SearchPage } from './modules';

import { Content, Title } from './app.sc';

const App = () => (
  <Content>
    <Title>Food King Eats</Title>
    <Switch>
      <Route exact={true} path="/" component={SearchPage} />
      <Route exact={true} path="/add" component={AddPage} />
    </Switch>
  </Content>
);

export default App;
