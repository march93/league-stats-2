import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Matchlist from './Matchlist';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/matches/:id' component={Matchlist}/>
    </Switch>
  </main>
)

export default Main;