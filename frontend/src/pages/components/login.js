import React, { useState } from "react";
import Axios from 'axios';

function Auth(){

    const [emailReg, setEmailReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginStatus, setLoginStatus] = useState('');

    const register = () => {
        Axios.post('http://localhost8000/register', {
            email: emailReg,
            password: passwordReg
        }).then((response =>{
            console.log(response);
        }));
    };

    const login = () => {
        Axios.post('http://localhost8000/login', {
            email: email,
            password: password
        }).then((response =>{
            if (response.data.message){
                setLoginStatus(response.data.message)
            } else{
                setLoginStatus(response.data[0].emailReg)
            }
        }));
    };

    return(
        <div className="auth">
            <div className="registration">
                <h1>Sign Up</h1>
                <label>Email</label>
                <input type="email" onChange={(e)=> {setEmailReg(e.target.value)}}/>
                <label>Password</label>
                <input type="password" onChange={(e)=> {setPasswordReg(e.target.value)}}/>
                <button onClick={register}>Register</button>
            </div>


            
            <div className="login">
                <h1>Login</h1>
                <input type="email" placeholder="Email" onChange={(e)=> {setEmail(e.target.value)}}/>
                <input type="password" placeholder="Password" onChange={(e)=> {setPassword(e.target.value)}}/>
                <button onClick={login}>Log In</button>
            </div>

            <h1>{loginStatus}</h1>
        </div>
    );
}
export default Auth;