import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { history } from './_helpers';
import { accountService } from './_services';
import App from './App';

accountService.refreshToken().finally(startApp);

function startApp() { 
  render(
      <BrowserRouter history={history}>
          <App />
      </BrowserRouter>,
      document.getElementById('root')
  );
}

