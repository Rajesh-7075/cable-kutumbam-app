import '../App.css';
import {
  Button,
  Input,
  FormGroup,
} from 'reactstrap';
import React, { useEffect, useState } from 'react'
import { withRouter } from "react-router-dom";
import { useToasts } from 'react-toast-notifications';

import axios from 'axios';




function Signin(props) {
  const { addToast } = useToasts();




  //Set page background color
  useEffect(() => {
    document.body.style.backgroundColor = "#154561"
  })



  const handlecontinue = () => {
    props.history.push("/homepage");

  }
  return (
    <div className="splash-container">


      <div className="welcome">
        <div >
          <img src="/static/img/logo.jpeg" alt="arrow" className="logo" />
        </div>

      </div>

      <div className="button">
        <Button className="continue" onClick={handlecontinue}>
          Continue
    </Button>
      </div>


    </div>

  );
}

export default withRouter(Signin);
