import '../App.css';
import {
  Button,
  Input,
  FormGroup,
} from 'reactstrap';
import React, { useEffect,useState } from 'react'
import { withRouter } from "react-router-dom";
import { useToasts } from 'react-toast-notifications';
import axios from 'axios';




const initialLoginState = {
    phoneNumber: '',
    phoneNumberError: '',
  password: "",
  passwordError: "",

};

function Login(props) {
  const [loginState, setLoginState] = useState(initialLoginState);
  const { addToast } = useToasts();


 

    //Set page background color
    useEffect(() => {
        document.body.style.backgroundColor = "#154561"
    })


    //Function to validate login state variables
    const validateLogin = () => {
      let passwordError, phoneNumberError;
   
    
      if (!loginState.phoneNumber) {
        phoneNumberError = 'phone Number is required';
    }
    let phoneRegex = /^\d{10}$/

    if (loginState.phoneNumber && !loginState.phoneNumber.match(phoneRegex)) {
        phoneNumberError = "Invalid phone Number";
    }
  
      if (!loginState.password) {
        passwordError = 'Password is required';
      }
      if ( passwordError || phoneNumberError) {
        setLoginState({ ...loginState,  passwordError, phoneNumberError });
        return false;
      }
      return true;
    };


  //Function to sign in user

  const signin = async() => {
     
    const isValid = validateLogin();
    if (isValid) {
        
      let formbody = {
        phoneNumber: loginState.phoneNumber,
        password: loginState.password
      }
        let url = process.env.REACT_APP_API_URL + '/api/login';
  
        axios.post(url,formbody)
        .then(function (response) {
          if(response.data.status && response.data.status===200){

            addToast('User Loggedin Successfully', {
              appearance: 'success',
              autoDismiss: true,
              autoDismissTimeout: 1000,
              onDismiss: () => {
                setLoginState(initialLoginState);
                localStorage.setItem("profilepic", response.data.data.profilePic);
                localStorage.setItem("id", response.data.data._id);
                localStorage.setItem('username', response.data.data.userName);
                localStorage.setItem('nwName', response.data.data.nwName);
          
                props.history.push("/IDcard");

              }
            })

         

          }
          else if(response.data.status && response.data.status===400){
            addToast('User does not exists', {
              appearance: 'error', autoDismiss: true,
              autoDismissTimeout: 2000,
            });
          }
          else if(response.data.status && response.data.status===401){
            addToast('Password is incorrect', {
              appearance: 'error', autoDismiss: true,
              autoDismissTimeout: 2000,
            });
          }
        })
        .catch(err => { console.log(err) })
    }

  }

  const signup=()=>{
    props.history.push('/registration')
  }

  return (
    <div className="splash-container">
      <div className="buttons-xUsx1L">



      <div className="content-signinup">
            <div className="textfields-signin">
            
                <div className="login-group">
                <FormGroup>
                  <Input
                    type="text"
                    name="mobileNumber"
                    value={loginState.phoneNumber}
                    onChange={(event) =>
                      event.target.value ?
                        setLoginState({ ...loginState, phoneNumber: event.target.value, phoneNumberError: "" }) : setLoginState({ ...loginState, phoneNumber: event.target.value, phoneNumberError: "Phone Number is required" })
                    }
                    placeholder="phoneNumber"

                  />

                </FormGroup>

                {loginState.phoneNumberError ? <div className="validation-error" >
                  {loginState.phoneNumberError}
                </div> : ""}
                </div>
              

              <div className="login-group">
                <FormGroup>
                  <Input
                    type="password"
                    name="password"
                    value={loginState.password}
                    onChange={(event) =>
                      event.target.value ?
                        setLoginState({ ...loginState, password: event.target.value, passwordError: "" }) : setLoginState({ ...loginState, password: event.target.value, passwordError: "Password is required" })
                    }
                    placeholder="Password"

                  />
                </FormGroup>

                {loginState.passwordError ? <div className="validation-error" >
                  {loginState.passwordError}
                </div> : ""}
              </div>
            </div>
            <div className="buttonslargeblue-signin">
              <Button className="signin-button" onClick={signin}>
                Login
        </Button>
            </div>

            <div className="buttonslargeblue-signin">
              <Button className="signup-button" onClick={signup}>
                Create New User
        </Button>
            </div>
    
          </div>

   
   
      </div>
    </div>

  );
}

export default withRouter(Login);