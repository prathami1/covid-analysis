//framework
import React from 'react';
import { Route, Switch } from 'react-router-dom'

//pages
import Datasets from './pages/Datasets'
import Time from './pages/Time'
import News from './pages/News'
import Vac from './pages/Vac'

function App() {
    return(
      <main>
        <Switch>
          <Route 
            path='/'
            component={Datasets}
            exact
          />
          <Route 
            path='/time-series-analysis'
            component={Time}
          />
          <Route 
            path='/news'
            component={News}
          />
          <Route 
            path='/vac'
            component={Vac}
          />
        </Switch>
      </main>
    );
}

export default App;