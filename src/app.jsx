import React from 'react';

import { Route } from 'react-router';

import { SearchPage } from './modules';

import { Content, Title } from './app.sc';

const App = () => (
  <Content>
    <Title>Food King Eats</Title>
    <Route exact={true} path="/" component={SearchPage} />
  </Content>
);

export default App;
