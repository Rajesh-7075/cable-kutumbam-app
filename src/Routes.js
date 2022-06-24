import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Redirect } from 'react-router';
import { ToastProvider } from 'react-toast-notifications';

import IDcard from "./components/IDcard"

function Routes() {

    if (localStorage.getItem('loggedin')) {
        return (
            <Router>
                <div>
                    <ToastProvider>
                    <Route exact path="/idcard" render={()=><IDcard />}/>



                    </ToastProvider>
                </div>
            </Router>
        )
    }
    else {
        return (
            <Redirect to="/" />

        )
    }
}

export default Routes;