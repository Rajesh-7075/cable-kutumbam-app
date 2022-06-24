import { withRouter } from "react-router-dom";
import { FormGroup, Input, Label } from "reactstrap";
import React, { useEffect, useState } from 'react'
import { Button } from "reactstrap";
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import { GoogleSpreadsheet } from "google-spreadsheet";

const initialState = {
    userName: "",
    nwName: "",
    village: "",
    mandal: "",
    district: "",
    email: "",
    phoneNumber: "",
    mgo: false,
    lco: false,
    ospecify: "",
    technician: false,
    cs: false,
    is: false,
    bothcsis: false,
    others: "",
    profilePic: "",
    userNameError: "",
    nwNameError: "",
    villageError: "",
    mandalError: "",
    districtError: "",
    emailError: "",
    phoneNumberError: ""

}


function Registration(props) {
    const [state, setState] = useState(initialState);
    const { addToast } = useToasts();


    // Config variables
    const SPREADSHEET_ID = "1pdLihmwahRFh3d831T4Fiw3rk6viU_bRxvL-ufLEmpc";
    const SHEET_ID = 0;
    const CLIENT_EMAIL = "cable-kutumbam@cable-kutumbam-354210.iam.gserviceaccount.com";
    const PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDRKVW4ETN+6Hqn\nzQKw0kO0Va6aVHRfKdsDdsZqzx+nPsQ66WsQEcJODdLDV3OZGyvy88TG72s2pT96\nTbevp2q/ePcS6cAytetbQbEes8AS1wJNXxXn/HfU1iqGfIAXCJlqX9scIpGq8LpO\nuibMAHhUkFO6SMCTX6/+cT2cPipFh+XQeuY/eUhoEU163/w1IQxVA6u1IIWn/Ytr\n1qN9nIsJrNRBk07M1GT0FQ+yFVQmR1xF3O5o1GHmIhgM4QLPVmRnRQP7HwIrlLkc\nECXGtIs6c2A5aINgpPmw3JJIBSzoGClnw3eO3O+6fJMPRalD5EMbsWGUDKJ6ctCs\nLuD8EhGBAgMBAAECggEAArTWNxuB3xKDA8jTUBZoadzx9W1CVDjmbJUM3DTx4+gc\nAecjS4HvUbM8Fur6w/BmES62TRyr9nkM6Tg4OD2iU/fsuoHryrwv325qLEuHILdH\ngFjKn8XUhxx+UF8sCSBDW+0BmMuZtuyGfJ5MAje/VtjHPJHUbBPA4znz4iGrylqB\nzf5Ar1XBM/L4xFTEZ3PBqOdwQMRwQXGwSuaAqGDHtzChdxwK5SlW6SASC3YTp/ON\niC+PpY/OxQnmfzss+7dQsOlpPZCVIAXay1lg8u6c5/yOM+OKxeDcbWNwRH6MBiqn\nllueL7c3rAM1HY2zNWARQCmWDpUQO6qY3dMh/sguQQKBgQD4JUH1iWnJ6/DnHJM2\n5/neBIZc/+Kk6oKgKLQ84sTZgRcckHZk2MCdD+TcMPAeCFSsmWUtr9aBFNQ2vALv\nCB3zQjLT8OoX4MYr34QEgfYZklMUSd0vT/B0WZj4Au2xBOiffUFZwMe7P+BBOb56\nKznvcbrDtaeZBIfW8gh1Dcc6OwKBgQDXyC+t0Rj9+HOBJRUAZ6us6E8SRLsnaset\nf+AefW1mrLTqfLu0dTbHJbQTCsTfxNQMu9X99/LpA9GkmNC6wRe3HTDvJDju8Ix+\nYe3Z7e7LcCNCJCZMZCLrTaTp/P8tLnPW5LXga9kDM7QhTW7NkG5dQUIFqrxWhfgY\n/vsBFrErcwKBgAeOuu+Le9lWgkPHrwQhFI8afC0g7fov2kKeer7P+UbWk6mfDLwN\njfA6p7G9G9MOVeXb1iUKEfJkfAIev8gf6ymZforN75NCmUaEzDSG8MPenQElLsNe\nH+irQelrzWlyyNLysabWJD8jtuTFqXN3FZChWhrT0YLrjGeTf4ZxIPw5AoGAYijx\n75tASEBeovAwhpeilCy107SqgrrjjPywAo7CVsPYJReK+AOeYKe5LDRo7PaIFCba\nqQbDXNbc5oiR43L1i9peqVsL/z40W0XHQq0nRSqFD5CMT5H6BJq0m7D4kCAimC5A\nwo+tD/TUS5YDAsZiPk/ybcuGk8Gr5AsSOiONgxsCgYEApqRonWH/4s8G+HBr4Mbl\nfiNauOlE1N5KQQZtHhXtC5Ro8qJaL30VzCh+qzHTrRZO5q4mng+2lFF8cFFY9geX\n8VZ278bMzGRT+ugZLGRa0oRajjy4eCA9MAlI+5V8vAiLZ80HoSsiyDmVtN/beb13\nwP8kElrWArXGAsNjlIBERss=\n-----END PRIVATE KEY-----\n";

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

    const appendSpreadsheet = async (row) => {
        try {
            await doc.useServiceAccountAuth({
                client_email: CLIENT_EMAIL,
                private_key: PRIVATE_KEY,
            });
            // loads document properties and worksheets
            await doc.loadInfo();

            const sheet = doc.sheetsById[SHEET_ID];
            const result = await sheet.addRow(row);
        } catch (e) {
            console.error('Error: ', e);
        }
    };



    //Function to validate signup state variables
    const validate = () => {
        let userNameError, nwNameError, villageError, mandalError, districtError, emailError, phoneNumberError;

        if (!state.userName) {
            userNameError = 'Name is required';
        }
        if (!state.nwName) {
            nwNameError = 'N/W Name is required';
        }
        if (!state.village) {
            villageError = 'Village is required';
        }
        if (!state.mandal) {
            mandalError = 'Mandal is required';
        }

        if (!state.district) {
            districtError = 'District is required';
        }
        if (!state.email) {
            emailError = 'Email is required';
        }
        let emailRegex = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"

        if (state.email && !state.email.match(emailRegex)) {
            emailError = "Invalid Email";
        }
        if (!state.phoneNumber) {
            phoneNumberError = 'phone Number is required';
        }
        let phoneRegex = /^\d{10}$/

        if (state.phoneNumber && !state.phoneNumber.match(phoneRegex)) {
            phoneNumberError = "Invalid phone Number";
        }

        if (userNameError || nwNameError || villageError || mandalError || districtError || emailError || phoneNumberError) {
            setState({ ...state, userNameError, nwNameError, villageError, mandalError, districtError, emailError, phoneNumberError });
            return false;
        }
        return true;
    };

    //Set page background color
    useEffect(() => {
        document.body.style.backgroundColor = "#154561"
    })
    const handlesubmit = () => {
        const isValid = validate();
        if (isValid) {
            const newRow = { username: state.userName, networkname: state.nwName, village: state.village, mandal: state.mandal, district: state.district, email: state.email, phonenumber: state.phoneNumber, mgo: state.mgo == true ? "YES" : "NO", lco: state.lco == true ? "YES" : "NO", otherspecify: state.ospecify, techncianEmployTrade: state.technician == true ? "YES" : "NO", cabletvServices: state.cs == true ? "YES" : "NO", internetServices: state.is == true ? "YES" : "NO", bothCableAndInternetServices: state.bothcsis == true ? "YES" : "NO", Others: state.others == true ? "YES" : "NO", profilepic: "" };

            appendSpreadsheet(newRow);
            addToast("User Registred sucessfully",
                {
                    appearance: 'success',
                    autoDismiss: true,
                    autoDismissTimeout: 1000,

                    onDismiss: () => {
                        setState(initialState);

              
                        localStorage.setItem('phonenumber', newRow.phonenumber);
                        localStorage.setItem('loggedin', true);

                        props.history.push("/idcard");
                    },
                })
        }



    }



    const handleprofilePic = (e) => {
        setState({ ...state, profilePic: e.target.files[0] })
        let reader = new FileReader();


    }
    return (
        <div className="splash-container">
            <div className="registration-main">

                <div className="group">

                    <FormGroup>
                        <Input
                            type="text"
                            name="userName"
                            value={state.userName}
                            placeholder="Name"
                            onChange={(event) =>
                                event.target.value ?
                                    setState({ ...state, userName: event.target.value, userNameError: "" }) : setState({ ...state, userName: event.target.value, userNameError: "Name is required" })
                            }
                        />
                    </FormGroup>
                    {state.userNameError ? <div className="validation-error" >
                        {state.userNameError}
                    </div> : ""}
                </div>
                <div className="group">

                    <FormGroup>
                        <Input
                            type="text"
                            name="Name"
                            value={state.nwName}
                            placeholder="Network Name"
                            onChange={(event) =>
                                event.target.value ?
                                    setState({ ...state, nwName: event.target.value, nwNameError: "" }) : setState({ ...state, nwName: event.target.value, nwNameError: "N/W Name is required" })
                            }
                        />
                    </FormGroup>
                    {state.nwNameError ? <div className="validation-error" >
                        {state.nwNameError}
                    </div> : ""}
                </div>
                <div className="group">


                    <FormGroup>
                        <Input
                            type="text"
                            name="Name"
                            value={state.village}
                            placeholder="VILLAGE"
                            onChange={(event) =>
                                event.target.value ?
                                    setState({ ...state, village: event.target.value, villageError: "" }) : setState({ ...state, village: event.target.value, villageError: "village is required" })
                            }
                        />
                    </FormGroup>
                    {state.villageError ? <div className="validation-error" >
                        {state.villageError}
                    </div> : ""}
                </div>     <div className="group">

                    <FormGroup>
                        <Input
                            type="text"
                            name="Name"
                            value={state.mandal}
                            placeholder="MANDAL"
                            onChange={(event) =>
                                event.target.value ?
                                    setState({ ...state, mandal: event.target.value, mandalError: "" }) : setState({ ...state, mandal: event.target.value, mandalError: "mandal is required" })
                            }
                        />
                    </FormGroup>
                    {state.mandalError ? <div className="validation-error" >
                        {state.mandalError}
                    </div> : ""}
                </div>
                <div className="group">

                    <FormGroup>
                        <Input type="select" name="select"
                              value={state.district}
                              placeholder="DISTRICT"
                              onChange={(event) =>
                                  event.target.value ?
                                      setState({ ...state, district: event.target.value, districtError: "" }) : setState({ ...state, district: event.target.value, districtError: "District is required" })
                              }

                        >
                            <option value="">Select District</option>
                            <option value="Anakapalli">Anakapalli</option>
                            <option value="Annamayya">Annamayya</option>
                            <option value="Anantapur">Anantapur</option>
                            <option value="AlluriSitharamaRaju">Alluri Sitharama Raju</option>
                            <option value="Bapatla">Bapatla</option>
                            <option value="Chittoor">Chittoor</option>
                            <option value="YSR">YSR</option>
                            <option value="EastGodavari">East Godavari</option>
                            <option value="Eluru">Eluru</option>
                            <option value="Guntur">Guntur</option>
                            <option value="Kakinada">Kakinada</option>
                            <option value="Konaseema">Konaseema</option>
                            <option value="Krishna">Krishna</option>
                            <option value="Kurnool">Kurnool</option>
                            <option value="SriPottiSriramuluNellore">Sri Potti Sriramulu Nellore</option>
                            <option value="Nandyal">Nandyal</option>
                            <option value="NTR">NTR</option>
                            <option value="Palnadu">Palnadu</option>
                            <option value="ParvathipuramManyam">Parvathipuram Manyam</option>
                            <option value="Prakasam">Prakasam</option>
                            <option value="Srikakulam">Srikakulam</option>
                            <option value="SriSathyaSai">Sri Sathya Sai</option>
                            <option value="Tirupati">Tirupati</option>
                            <option value="Visakhapatnam">Visakhapatnam</option>
                            <option value="Vizianagaram">Vizianagaram</option>
                            <option value="WestGodavari">West Godavari</option>
                        </Input>
                    
                    </FormGroup>
                    {state.districtError ? <div className="validation-error" >
                        {state.districtError}
                    </div> : ""}
                </div>
                <div className="group">

                    <FormGroup>
                        <Input
                            type="text"
                            name="email"
                            value={state.email}
                            placeholder="email"
                            onChange={(event) =>
                                event.target.value ?
                                    setState({ ...state, email: event.target.value, emailError: "" }) : setState({ ...state, email: event.target.value, emailError: "Email is required" })
                            }
                        />
                    </FormGroup>

                    {state.emailError ? <div className="validation-error" >
                        {state.emailError}
                    </div> : ""}
                </div>
                <div className="group">

                    <FormGroup>
                        <Input

                            type="text"
                            name="Name"
                            value={state.phoneNumber}
                            placeholder="PHONE NUMBER"
                            onChange={(event) =>
                                event.target.value ?
                                    setState({ ...state, phoneNumber: event.target.value, phoneNumberError: "" }) : setState({ ...state, phoneNumber: event.target.value, phoneNumberError: "Phone Number is required" })
                            }
                        />
                    </FormGroup>

                    {state.phoneNumberError ? <div className="validation-error" >
                        {state.phoneNumberError}
                    </div> : ""}
                </div>
                <div className="group3">
                    <Input type="checkbox"
                        value={state.mgo}
                        onChange={(event) =>
                            setState({ ...state, mgo: event.target.checked })
                        } />{' '}

                    <Label > Mgo     </Label>

                </div>
                <div className="lco-label">
                    <Input type="checkbox"
                        value={state.lco}
                        onChange={(event) =>
                            setState({ ...state, lco: event.target.checked })
                        }
                    />{' '}

                    <Label >    Lco          </Label>{" "}
                </div>
                <div className="group4">

                    <FormGroup>
                        <Input
                            type="text"
                            name="ospecify"
                            value={state.ospecify}
                            placeholder="Other specify"
                            onChange={(event) =>
                                event.target.value ?
                                    setState({ ...state, ospecify: event.target.value }) : setState({ ...state, ospecify: event.target.value })
                            }
                        />
                    </FormGroup>
                </div>
                <div className="group2">
                    <Input type="checkbox"
                        value={state.technician}
                        onChange={(event) =>
                            setState({ ...state, technician: event.target.checked })
                        }
                    />{' '}

                    <Label >  Technician/employer Trade   </Label>

                </div>
                <div className="group2">
                    <Input type="checkbox"
                        value={state.cs}

                        onChange={(event) =>
                            setState({ ...state, cs: event.target.checked })
                        }
                    />{' '}

                    <Label >   CableTv Services        </Label>

                </div>
                <div className="group2">
                    <Input type="checkbox"
                        value={state.is}
                        onChange={(event) =>
                            setState({ ...state, is: event.target.checked })
                        }
                    />{' '}

                    <Label >Internet Services          </Label>

                </div>
                <div className="group2">
                    <Input type="checkbox"
                        value={state.bothcsis}

                        onChange={(event) =>
                            setState({ ...state, bothcsis: event.target.checked })
                        }
                    />{' '}

                    <Label > Both Cable And Internet Services       </Label>

                </div>
                <div className="group2">
                    <Input type="checkbox"
                        value={state.others}
                        onChange={(event) =>
                            setState({ ...state, others: event.target.checked })
                        }
                    />{' '}

                    <Label >  Others         </Label>

                </div>
                <div className="group5">
                    <div className="profile">
                        <Label>Upload ProfilePic :</Label>

                    </div>
                    <FormGroup>
                        <Input
                            type="file"
                            accept="image/*"
                            name="image"
                            onChange={(event) =>
                                handleprofilePic(event)
                            }
                        />


                    </FormGroup>
                </div>
                <div>
                    <Button className="submit-button" onClick={handlesubmit}>
                        SUBMIT
    </Button>
                </div>
            </div>
        </div>

    )
}
export default withRouter(Registration);
