import { withRouter } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import { FormGroup, Input, Label, Card, Form } from "reactstrap";
import QRCode from "react-qr-code";
import axios from 'axios';

function IDcard(props) {
    const [profilePic, setProfilePic] = useState(localStorage.getItem("profilepic"))
    const [userName, setUsername] = useState(localStorage.getItem("username"))
    const [nwName, setnwname] = useState(localStorage.getItem("nwName"))
    const [user, setUser] = useState([])
    //Set page background color
    useEffect(() => {
        document.body.style.backgroundColor = "#154561"
    })
    //Function to logout from the app
    const logout = () => {
        localStorage.clear();

        window.location.href = "/"
    }


//function to get userdata
const getUserdata=()=>{
    let url = process.env.REACT_APP_API_URL + '/api/getuserdata' + localStorage.getItem('id');
    axios
      .get(url)
      .then(response => {
        if(response.data.rows.length!==0){
            setUser(response.data.rows);
        }
        else{
            setUser({nodata:"nodata"})
        }
       

      })
      .catch(err => {
        console.log(err)
      })
  }


  useEffect(() => {
    getUserdata();
  }, );
    return (
        <div >
            <div className="logout">
                <a className="menu-item" href="#/"><img src="/static/img/logout.svg" alt="logout" onClick={logout} className="menu-item" /></a>

                <div>
                    Logout

</div>
            </div>

            <div className="iddata">

                <span className="span1"> ID CARD
         </span>
                <div>
                    <img className="photo-registered" src={profilePic !== undefined ? "/static/" + profilePic : "img/users/user.png"} alt="img" />


                </div>
                <div className="data">
                    <FormGroup>
                        <Label>Name: </Label>{" "}
                        {userName !== undefined ? userName : ""}

                    </FormGroup>
                    <FormGroup>
                        <Label>N/W Name: </Label>{" "}
                        {nwName !== undefined ? nwName : ""}

                    </FormGroup>
                    <FormGroup>
                        {user.length!==0 ?
                        <div className="qrcode"> 
                        <QRCode size="200" title="User Deatils" value={"userName: "+user[0].userName + " " +"N/W Name: "+user[0].nwName+" "+"village: "+user[0].village+" "+"mandal: "+user[0].mandal+" "+"district: "+user[0].district+" "+"email: "+user[0].email+" "+" phoneNumber: "+user[0].phoneNumber } />
                     
                        </div>
   :""}
                    </FormGroup>
                    <FormGroup>
                        <div>
                            <img src="/static/img/logo.jpeg" alt="arrow" className="logo1" />

                            <h5 className="CABLE">CABLE KUTUMBAM</h5>

                        </div>

                    </FormGroup>

                </div>


            </div>

        </div>

    )
}
export default withRouter(IDcard);
