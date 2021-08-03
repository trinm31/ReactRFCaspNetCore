import './App.css';
import Order from './components/Orders';
import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { Role } from './_helpers';
import { accountService } from './_services';
import { Nav } from './components/bar/Nav';
import { PrivateRoute } from './routes/PrivateRoute';
import { Home } from './components/home';
import { Profile } from './components/profile';
import { Admin } from './components/admin';
import { Account } from './components/account';

function App() {
  const { pathname } = useLocation();  
  
  const [user, setUser] = useState({});

  useEffect(() => {
      const subscription = accountService.user.subscribe(x => setUser(x));
      return subscription.unsubscribe;
  }, []);
  return (
      <div className={'app-container' + (user && ' bg-light')}>
          <Nav />
          <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute path="/order" roles={[Role.Admin]} component={Order} />
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/admin" roles={[Role.Admin]} component={Admin} />
              <Route path="/account" component={Account} />
              <Route path="*" to="/" />
          </Switch>
      </div>
  );
}

export default App;
