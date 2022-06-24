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
import { GoogleSpreadsheet } from "google-spreadsheet";




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



    // Config variables
    const SPREADSHEET_ID = "1pdLihmwahRFh3d831T4Fiw3rk6viU_bRxvL-ufLEmpc";
    const SHEET_ID = 0;
    const CLIENT_EMAIL = "cable-kutumbam@cable-kutumbam-354210.iam.gserviceaccount.com";
    const PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDRKVW4ETN+6Hqn\nzQKw0kO0Va6aVHRfKdsDdsZqzx+nPsQ66WsQEcJODdLDV3OZGyvy88TG72s2pT96\nTbevp2q/ePcS6cAytetbQbEes8AS1wJNXxXn/HfU1iqGfIAXCJlqX9scIpGq8LpO\nuibMAHhUkFO6SMCTX6/+cT2cPipFh+XQeuY/eUhoEU163/w1IQxVA6u1IIWn/Ytr\n1qN9nIsJrNRBk07M1GT0FQ+yFVQmR1xF3O5o1GHmIhgM4QLPVmRnRQP7HwIrlLkc\nECXGtIs6c2A5aINgpPmw3JJIBSzoGClnw3eO3O+6fJMPRalD5EMbsWGUDKJ6ctCs\nLuD8EhGBAgMBAAECggEAArTWNxuB3xKDA8jTUBZoadzx9W1CVDjmbJUM3DTx4+gc\nAecjS4HvUbM8Fur6w/BmES62TRyr9nkM6Tg4OD2iU/fsuoHryrwv325qLEuHILdH\ngFjKn8XUhxx+UF8sCSBDW+0BmMuZtuyGfJ5MAje/VtjHPJHUbBPA4znz4iGrylqB\nzf5Ar1XBM/L4xFTEZ3PBqOdwQMRwQXGwSuaAqGDHtzChdxwK5SlW6SASC3YTp/ON\niC+PpY/OxQnmfzss+7dQsOlpPZCVIAXay1lg8u6c5/yOM+OKxeDcbWNwRH6MBiqn\nllueL7c3rAM1HY2zNWARQCmWDpUQO6qY3dMh/sguQQKBgQD4JUH1iWnJ6/DnHJM2\n5/neBIZc/+Kk6oKgKLQ84sTZgRcckHZk2MCdD+TcMPAeCFSsmWUtr9aBFNQ2vALv\nCB3zQjLT8OoX4MYr34QEgfYZklMUSd0vT/B0WZj4Au2xBOiffUFZwMe7P+BBOb56\nKznvcbrDtaeZBIfW8gh1Dcc6OwKBgQDXyC+t0Rj9+HOBJRUAZ6us6E8SRLsnaset\nf+AefW1mrLTqfLu0dTbHJbQTCsTfxNQMu9X99/LpA9GkmNC6wRe3HTDvJDju8Ix+\nYe3Z7e7LcCNCJCZMZCLrTaTp/P8tLnPW5LXga9kDM7QhTW7NkG5dQUIFqrxWhfgY\n/vsBFrErcwKBgAeOuu+Le9lWgkPHrwQhFI8afC0g7fov2kKeer7P+UbWk6mfDLwN\njfA6p7G9G9MOVeXb1iUKEfJkfAIev8gf6ymZforN75NCmUaEzDSG8MPenQElLsNe\nH+irQelrzWlyyNLysabWJD8jtuTFqXN3FZChWhrT0YLrjGeTf4ZxIPw5AoGAYijx\n75tASEBeovAwhpeilCy107SqgrrjjPywAo7CVsPYJReK+AOeYKe5LDRo7PaIFCba\nqQbDXNbc5oiR43L1i9peqVsL/z40W0XHQq0nRSqFD5CMT5H6BJq0m7D4kCAimC5A\nwo+tD/TUS5YDAsZiPk/ybcuGk8Gr5AsSOiONgxsCgYEApqRonWH/4s8G+HBr4Mbl\nfiNauOlE1N5KQQZtHhXtC5Ro8qJaL30VzCh+qzHTrRZO5q4mng+2lFF8cFFY9geX\n8VZ278bMzGRT+ugZLGRa0oRajjy4eCA9MAlI+5V8vAiLZ80HoSsiyDmVtN/beb13\nwP8kElrWArXGAsNjlIBERss=\n-----END PRIVATE KEY-----\n";

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
  //Function to sign in user

  const signin = async() => {
     
    const isValid = validateLogin();

    if (isValid) {
      if(loginState.phoneNumber==loginState.password){
        try {
          await doc.useServiceAccountAuth({
              client_email: CLIENT_EMAIL,
              private_key: PRIVATE_KEY,
          });
          // loads document properties and worksheets
          await doc.loadInfo();


          const sheet = doc.sheetsById[SHEET_ID];
          const rows = await sheet.getRows();
          rows.map((userdata) => {
              if (userdata.phonenumber ==loginState.phoneNumber) {


                addToast('User Loggedin Successfully', {
                  appearance: 'success',
                  autoDismiss: true,
                  autoDismissTimeout: 1000,
                  onDismiss: () => {
                    setLoginState(loginState);
                    localStorage.setItem('phonenumber',loginState.phoneNumber);
                    localStorage.setItem('loggedin', true);

                    props.history.push("/idcard");
    
                  }
                })
              }
         



          })

      } catch (e) {
          console.error('Error: ', e);
      }


      }
      else {

     
          addToast('Password is incorrect', {
            appearance: 'error',
            autoDismiss: true,
            autoDismissTimeout: 1000,
            onDismiss: () => {
              setLoginState(loginState);
          

            }
          })
        

        }
        
      

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
                    placeholder="PHONE NUMBER"

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
                    placeholder="PASSWORD"

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