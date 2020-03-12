import React, { useState } from 'react';
import './styles.scss';

import Logo from '../../components/Logo';
import Input from '../../components/Input';
import Button from '../../components/Button';

import {Link} from 'react-router-dom';

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="route login">
            <div className="login-to-heapstack">
                <span>Login to</span> <Logo primary/>
            </div>
            <div className="login-container">
                <div className="login-form">
                    <Input 
                        type="email"
                        label={"Email"} 
                        onChange={(e: any) => setEmail(e.target.value)} 
                        value={email} 
                        placeholder="Email"
                    />
                    <Input 
                        type="password"
                        label={"Password"} 
                        onChange={(e: any) => setPassword(e.target.value)} 
                        value={password} 
                        placeholder="Password"
                    />
                    <Link to="/resetpassword">Forgot your password?</Link>
                    <Button primary title="Sign in"/>
                    <Link className="register-link" to="/register">Don't have an account?</Link>
                </div>
            </div>
        </div>
    )
}