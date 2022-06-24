import { withRouter } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import { FormGroup, Input, Label, Card, Form } from "reactstrap";
import QRCode from "react-qr-code";
import axios from 'axios';
import { GoogleSpreadsheet } from "google-spreadsheet";

function IDcard(props) {

    const [user, setUser] = useState([])
    //Set page background color


    // Config variables
    const SPREADSHEET_ID = "1pdLihmwahRFh3d831T4Fiw3rk6viU_bRxvL-ufLEmpc";
    const SHEET_ID = 0;
    const CLIENT_EMAIL = "cable-kutumbam@cable-kutumbam-354210.iam.gserviceaccount.com";
    const PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDRKVW4ETN+6Hqn\nzQKw0kO0Va6aVHRfKdsDdsZqzx+nPsQ66WsQEcJODdLDV3OZGyvy88TG72s2pT96\nTbevp2q/ePcS6cAytetbQbEes8AS1wJNXxXn/HfU1iqGfIAXCJlqX9scIpGq8LpO\nuibMAHhUkFO6SMCTX6/+cT2cPipFh+XQeuY/eUhoEU163/w1IQxVA6u1IIWn/Ytr\n1qN9nIsJrNRBk07M1GT0FQ+yFVQmR1xF3O5o1GHmIhgM4QLPVmRnRQP7HwIrlLkc\nECXGtIs6c2A5aINgpPmw3JJIBSzoGClnw3eO3O+6fJMPRalD5EMbsWGUDKJ6ctCs\nLuD8EhGBAgMBAAECggEAArTWNxuB3xKDA8jTUBZoadzx9W1CVDjmbJUM3DTx4+gc\nAecjS4HvUbM8Fur6w/BmES62TRyr9nkM6Tg4OD2iU/fsuoHryrwv325qLEuHILdH\ngFjKn8XUhxx+UF8sCSBDW+0BmMuZtuyGfJ5MAje/VtjHPJHUbBPA4znz4iGrylqB\nzf5Ar1XBM/L4xFTEZ3PBqOdwQMRwQXGwSuaAqGDHtzChdxwK5SlW6SASC3YTp/ON\niC+PpY/OxQnmfzss+7dQsOlpPZCVIAXay1lg8u6c5/yOM+OKxeDcbWNwRH6MBiqn\nllueL7c3rAM1HY2zNWARQCmWDpUQO6qY3dMh/sguQQKBgQD4JUH1iWnJ6/DnHJM2\n5/neBIZc/+Kk6oKgKLQ84sTZgRcckHZk2MCdD+TcMPAeCFSsmWUtr9aBFNQ2vALv\nCB3zQjLT8OoX4MYr34QEgfYZklMUSd0vT/B0WZj4Au2xBOiffUFZwMe7P+BBOb56\nKznvcbrDtaeZBIfW8gh1Dcc6OwKBgQDXyC+t0Rj9+HOBJRUAZ6us6E8SRLsnaset\nf+AefW1mrLTqfLu0dTbHJbQTCsTfxNQMu9X99/LpA9GkmNC6wRe3HTDvJDju8Ix+\nYe3Z7e7LcCNCJCZMZCLrTaTp/P8tLnPW5LXga9kDM7QhTW7NkG5dQUIFqrxWhfgY\n/vsBFrErcwKBgAeOuu+Le9lWgkPHrwQhFI8afC0g7fov2kKeer7P+UbWk6mfDLwN\njfA6p7G9G9MOVeXb1iUKEfJkfAIev8gf6ymZforN75NCmUaEzDSG8MPenQElLsNe\nH+irQelrzWlyyNLysabWJD8jtuTFqXN3FZChWhrT0YLrjGeTf4ZxIPw5AoGAYijx\n75tASEBeovAwhpeilCy107SqgrrjjPywAo7CVsPYJReK+AOeYKe5LDRo7PaIFCba\nqQbDXNbc5oiR43L1i9peqVsL/z40W0XHQq0nRSqFD5CMT5H6BJq0m7D4kCAimC5A\nwo+tD/TUS5YDAsZiPk/ybcuGk8Gr5AsSOiONgxsCgYEApqRonWH/4s8G+HBr4Mbl\nfiNauOlE1N5KQQZtHhXtC5Ro8qJaL30VzCh+qzHTrRZO5q4mng+2lFF8cFFY9geX\n8VZ278bMzGRT+ugZLGRa0oRajjy4eCA9MAlI+5V8vAiLZ80HoSsiyDmVtN/beb13\nwP8kElrWArXGAsNjlIBERss=\n-----END PRIVATE KEY-----\n";

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
    useEffect(() => {
        document.body.style.backgroundColor = "#154561"
    })
    //Function to logout from the app
    const logout = () => {
        localStorage.clear();

        window.location.href = "/"
    }

    //function to get userdata
    const getUserdata = async () => {

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
                if (userdata.phonenumber == localStorage.getItem("phonenumber")) {
                    setUser(userdata._rawData)
                }



            })

        } catch (e) {
            console.error('Error: ', e);
        }

    }

    useEffect(() => {
        getUserdata();
    });
    return (
        <div >
            <div className="logout">
                <a className="menu-item" href="#/"><img src="/static/img/logout.svg" alt="logout" onClick={logout} className="menu-item" /></a>

                <div className="label-log">
                    Logout

</div>
            </div>

            <div className="iddata">

                <span className="span1"> ID CARD
         </span>
                <div>
                    <img className="photo-registered" src="/static/img/logo.jpeg" alt="logo" />


                </div>
                <div className="data">
                    <FormGroup>
                        <Label>Name: </Label>{" "}
                        {user[0] !== undefined ? user[0] : ""}

                    </FormGroup>
                    <FormGroup>
                        <Label>Network Name: </Label>{" "}
                        {user[1] !== undefined ? user[1] : ""}

                    </FormGroup>
                    <FormGroup>
                        {user.length !== 0 ?
                            <div className="qrcode">
                                <QRCode size="190" title="User Deatils" value={"userName: " + user[0] + " " + "Network Name: " + user[1] + " " + "village: " + user[2] + " " + "mandal: " + user[3] + " " + "district: " + user[4] + " " + "email: " + user[5] + " " + " phoneNumber: " + user[6] +" "+"mgo :"+user[7]+" "+"lco :"+user[8]+" "+"other specify :"+user[9]+" "+"technician/employe trade :"+user[10]+" "+"cable services :"+user[11]+" "+"internet services :"+user[12]+" "+"both cable and internet services :"+user[13]+" "+"others :"+user[14]}  />

                            </div>
                            : ""}
                    </FormGroup>
                    <FormGroup>
                    
                    </FormGroup>

                </div>


            </div>

        </div>

    )
}
export default withRouter(IDcard);
