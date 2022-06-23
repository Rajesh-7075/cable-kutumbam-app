import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Redirect } from 'react-router';
import { ToastProvider } from 'react-toast-notifications';


function Routes() {

    if (localStorage.getItem('loggedin')) {
        return (
            <Router>
                <div>
                    <ToastProvider>



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