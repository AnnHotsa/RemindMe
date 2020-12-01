import React  from 'react';
import { render } from 'react-dom';
// import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import {  MemoryRouter as Router, Route } from 'react-router-dom';
// import { configureStore, history } from '../store/configureStore';
import './app.global.css';
import TrayWindowComponent from './pages/Tray.page';

// const store = configureStore();

// const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

let routing = (
  <Router>
      <div>
          <Route exact path="/" component={TrayWindowComponent} />
      </div>
  </Router>
);
render(routing, document.getElementById("tray-window"));
