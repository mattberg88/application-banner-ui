import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from './components/layout/NotFound';
import Banners from './Banners/Banners';

export default (
  <Switch>
    <Route
      path='/ui/banner/'
      component={Banners}
    />
    <Route component={NotFound} />
  </Switch>
);
