import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './components/layout/App';
import * as serviceWorker from './serviceWorker';
import moment from 'moment';
import 'moment/locale/ja';

moment.locale('ja');

ReactDOM.render(
  <Router>
    <App urlPrefix=''/>
  </Router>,
  document.getElementById('root')
);

serviceWorker.unregister();
