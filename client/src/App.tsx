import React from 'react';
import {Container} from '@material-ui/core'

import Header from './components/Header'
import ScreenplayForm from './components/ScreenplayForm'

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Container>
        <ScreenplayForm />
      </Container>
    </div>
  );
}

export default App;
