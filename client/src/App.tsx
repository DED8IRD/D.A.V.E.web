import React from 'react';
import {Grid} from '@material-ui/core'

import Header from './components/Header'
import ScreenplayForm from './components/ScreenplayForm'

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Grid
        container
        justify='center'
        alignItems='center'
        alignContent='center'
      >
        <ScreenplayForm />
      </Grid>
    </div>
  );
}

export default App;
