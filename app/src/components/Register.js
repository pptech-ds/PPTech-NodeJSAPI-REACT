import React, { useState } from 'react';
import './../App.css';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';



function Register() {
    const [emailReg, setEmailReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [passwordConfirmReg, setPasswordConfirmReg] = useState("");
    const [registerStatus, setRegisterStatus] = useState("");

    
    const register = () => {
        Axios.post('http://localhost:3005/register', {
            email: emailReg,
            password: passwordReg,
            passwordConfirm: passwordConfirmReg,
        }).then((response) => {
            if(response.data.message){
                setRegisterStatus(response.data.message);
            }

            console.log(response.data);
        })
    };

    return (
        <div className="App">
            <div className="registration">
                <h1>Registration</h1>
                <div className="form-group">
                    <label>Email</label>
                    <input style={{display: 'margin-right:10px'}}
                        type="text" 
                        onChange={(e) => { 
                            setEmailReg(e.target.value);
                        }}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        onChange={(e) => { 
                            setPasswordReg(e.target.value);
                        }}
                    />
                </div>
                <div className="form-group">
                    <label>PasswordConfirm</label>
                    <input 
                        type="password" 
                        onChange={(e) => { 
                            setPasswordConfirmReg(e.target.value);
                        }}
                    />
                </div>
                <div className="form-group">
                    <button onClick={register}>Register</button>
                </div>
            </div>

            <h1>{registerStatus}</h1>
        </div>   
    );
}

export default Register;
