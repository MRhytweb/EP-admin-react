import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Login from './pages/login'
import Admin from './pages/admin'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
		<Switch>
			<Route path='/login' component={Login}></Route>
			<Route path='/' component={Admin}></Route>
		</Switch>
	  </BrowserRouter>
    </div>
  );
}

export default App;