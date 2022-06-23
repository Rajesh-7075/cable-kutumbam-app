import { withRouter } from "react-router-dom";
import { FormGroup, Input, Label } from "reactstrap";
import React, { useEffect, useState } from 'react'
import { Button } from "reactstrap";
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';

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
    is:false,
    bothcsis:false,
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
        let url = process.env.REACT_APP_API_URL + '/api/user';
        const formData = new FormData();

        formData.append("userName", state.userName);
        formData.append("nwName", state.nwName);

        formData.append("village", state.village);
        formData.append("mandal", state.mandal);
        formData.append("district", state.district);
        formData.append("email", state.email);
        formData.append("phoneNumber", state.phoneNumber);
        formData.append("mgo", state.mgo);
        formData.append("lco", state.lco);
        formData.append("ospecify", state.ospecify);
        formData.append("technician", state.technician);
        formData.append("cs", state.cs);
        formData.append("is", state.is);
        formData.append("bothcsis", state.bothcsis);
        formData.append("others", state.others);
        formData.append("profilePic", state.profilePic);
        let axiosConfig = {
            headers: {
                "Content-Type": "application/json",
                "Content-Type": "multipart/form-data",
            },
        };

        if (isValid) {
            axios.post(url, formData, axiosConfig)
                .then(function (response) {
                    if (response.data.status === 200) {
                        addToast("User Registred sucessfully",
                            {
                                appearance: 'success',
                                autoDismiss: true,
                                autoDismissTimeout: 1000,

                                onDismiss: () => {
                                    setState(initialState);

                                      localStorage.setItem("profilepic", response.data.data.profilePic);
                                      localStorage.setItem("id", response.data.data._id);
                                      localStorage.setItem('username', response.data.data.userName);
                                      localStorage.setItem('nwName', response.data.data.nwName);
                                
                                      props.history.push("/Idcard");
                                },
                            })
                    }
                    else if (response.data.status === 400) {
                        addToast('User details not updated', {
                            appearance: 'error', autoDismiss: true,
                            autoDismissTimeout: 2000,
                        });

                    }
                })
                .catch(err => {
                    addToast("error",
                        {
                            appearance: 'error',
                            autoDismiss: true,
                            autoDismissTimeout: 2000,

                        })
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
                            placeholder="N/W Name"
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
                        <Input
                            type="text"
                            name="Name"
                            value={state.district}
                            placeholder="DISTRICT"
                            onChange={(event) =>
                                event.target.value ?
                                    setState({ ...state, district: event.target.value, districtError: "" }) : setState({ ...state, district: event.target.value, districtError: "District is required" })
                            }
                        />

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

                    <Label > Mgo     </Label>{" "}
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
                <div className="group2">

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
