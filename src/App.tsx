import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from './theme';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <React.Fragment>
        <CssBaseline/>
        <div>Ok</div>
      </React.Fragment>
    </MuiThemeProvider>
  );
}

export default App;
