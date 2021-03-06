import React  from "react";
import {  Splash} from "./components";
import { BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import Routes from './Routes'

import Homepage from './components/Homepage';
import Registration from './components/Registration';
import Login from "./components/Login"
function App() {

  return (
    
    <div className="App">
      <Router>
       <Switch>
        <div>
        <ToastProvider>
          <Route exact path="/" render={()=>localStorage.getItem("loggedin")? "":<Splash />}/>
          <Route exact path="/homepage" render={()=><Homepage />}/>
          <Route exact path="/registration" render={()=><Registration />}/>
          <Route exact path="/login" render={()=><Login />}/>
          <Route path="/" render={(props)=><Routes {...props}/>}/>

          </ToastProvider>
         
          </div>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
