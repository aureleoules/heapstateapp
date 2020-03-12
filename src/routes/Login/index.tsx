import React, { useState } from 'react';
import './styles.scss';

import Logo from '../../components/Logo';
import Input from '../../components/Input';
import Button from '../../components/Button';

import {Link} from 'react-router-dom';

import { useTranslation } from 'react-i18next';

export default function Login() {

    const { t, i18n } = useTranslation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="route login">

            <Logo absolute image/>

            <div className="login-to-heapstack">
                <span>{t('Login to')} </span> <Logo primary/>
            </div>
            <div className="login-container">
                <div className="login-form">
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
                    <Button primary title={t('Sign in')}/>
                    <Link className="register-link" to="/register">{t("Don't have an account?")}</Link>
                </div>
            </div>
        </div>
    )
}