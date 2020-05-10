import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { StoreProvider } from './store';

import theme from './theme';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <React.Fragment>
        <CssBaseline/>
        <StoreProvider>
          <p>ok</p>
        </StoreProvider>
      </React.Fragment>
    </MuiThemeProvider>
  );
}

export default App;
