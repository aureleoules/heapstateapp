import React, { useState } from 'react';
import './styles.scss';

import Logo from '../../components/Logo';
import Input from '../../components/Input';
import Button from '../../components/Button';

import {Link} from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import {userActions} from '../../actions';
import { useDispatch } from 'react-redux';

function Login() {

    const {t} = useTranslation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    function submit(e: any) {
        e.preventDefault();
        dispatch(userActions.authenticate(email, password));
    }

    return (
        <div className="route login">

            <Logo absolute image/>

            <div className="login-to-heapstack">
                <span>{t('Login to')} </span> <Logo primary/>
            </div>
            <div className="login-container">
                <form className="login-form" onSubmit={submit}>
                    <Input 
                        type="email"
                        label={t('Email')} 
                        onChange={(e: any) => setEmail(e.target.value)} 
                        value={email} 
                        placeholder={t('Email')}
                    />
                    <Input 
                        type="password"
                        label={t('Password')} 
                        onChange={(e: any) => setPassword(e.target.value)} 
                        value={password} 
                        placeholder={t('Password')}
                    />
                    <Link to="/resetpassword">{t('Forgot your password?')}</Link>
                    <Button submit primary title={t('Sign in')}/>
                    <Link className="register-link" to="/register">{t("Don't have an account?")}</Link>
                </form>
            </div>
        </div>
    )
}

export default Login;