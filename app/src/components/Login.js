import React, { useState } from 'react';
import './../App.css';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
    const [emailLog, setEmailLog] = useState("");
    const [passwordLog, setPasswordLog] = useState("");
    const [loginStatus, setLoginStatus] = useState("");


    const login = () => {
        Axios.post('http://localhost:3005/login', {
            email: emailLog,
            password: passwordLog,
        }).then((response) => {
            if(response.data.message){
                setLoginStatus(response.data.message);
            } else {
                console.log(response.data.result[0].email);
                setLoginStatus('User ' + response.data.result[0].email + ' connected');
            }

            console.log(response.data);
            
        })
    };

    return (
        
        <div className="App">

            <div className="login">
                <h1>login</h1>
                <div className="form-group">
                    <label>Email</label>
                    <input 
                        type="text" 
                        onChange={(e) => { 
                            setEmailLog(e.target.value);
                        }}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        onChange={(e) => { 
                            setPasswordLog(e.target.value);
                        }}
                    />
                </div>
                <div className="form-group">
                    <button onClick={login}>Login</button>
                </div>
            </div>

            <h1>{loginStatus}</h1>
        </div>
    );
}

export default Login;
