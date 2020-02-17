import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
// @ts-ignore
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import './app.css';
import '../../font-numbers/style.css'
import reducer from '../../redux/reducers/index';

import NewBrick from '../build/newBrick/newBrick';
import MainPage from '../build/mainPage/mainPage';
import ProFormaPage from '../build/proFormaPage/proFormaPage';
import BricksListPage from '../build/bricksListPage/bricksListPage';
import InvestigationBuildPage from '../build/investigationBuildPage/investigationBuildPage'
import LoginPage from '../loginPage/loginPage';
import RegisterPage from '../registerPage/registerPage';
import PreLoginPage from '../preLoginPage/preLoginPage';


console.log(process.env.REACT_APP_BACKEND_HOST)

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

const App: React.FC = () => {
  let history = useHistory();

  const theme = React.useMemo(() =>
    createMuiTheme({
      palette: {
        primary: { main: "#0B3A7E" }
      }
    }),
    [],
  );

  axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    history.push("/pre-login");
    return Promise.reject(error);
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/build/new-brick" component={NewBrick} />
          <Route path="/build/brick/:brickId" component={InvestigationBuildPage}/>
          <Route path="/build/brick-create" exact component={ProFormaPage}/>
          <Route path="/build/brick-create/:brickId" exact component={ProFormaPage}/>
          <Route path="/build/bricks-list" component={BricksListPage}/>
          <Route path="/pre-login" component={PreLoginPage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/register" exact component={RegisterPage} />
          <Route path="/build" component={MainPage} />
          <Route path="/" component={MainPage} />
        </Switch>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
