import { withRouter } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import { Button } from "reactstrap";

function Homepage(props) {

    //Set page background color
    useEffect(() => {
        document.body.style.backgroundColor = "#154561"
    })
const handleregistration=()=>{
    props.history.push("/registration");

}
const handlelogin=()=>{
    props.history.push("/login");

}
    return (
        <div className="splash-container">
       
        <div className="Homepage">
                <span className="homepage">CONNECT FIBER-2022</span>
                <span className="homepage">THE NEXT GENERATION NETWORKS A.P</span>
                <span className="homepage">JULY 3RD SUNDAY</span>
                <span className="homepage">SURYAKALA MANDIR A/C HALL</span>
                <span className="homepage">KAKINADA - 533001</span>
            </div>
            <div className="registration-button">
                <Button className="registration" onClick={handleregistration}>
                    REGISTRATION
            </Button></div>
            <div className="login-button">
                <Button className="registration" onClick={handlelogin}>
                    LOGIN
            </Button></div>



        </div>
    )
}
export default withRouter(Homepage);
