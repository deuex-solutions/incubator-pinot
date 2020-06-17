import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core';
import HomePage from './pages/HomePage';
import theme from './theme';
 
const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <HomePage />
    </MuiThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
