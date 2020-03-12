import React, { useState } from 'react';
import './styles.scss';

import Logo from '../../components/Logo';
import Input from '../../components/Input';
import Button from '../../components/Button';

import {Link} from 'react-router-dom';

import { useTranslation } from 'react-i18next';

export default function Register() {

    const { t, i18n } = useTranslation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="route register">

            <Logo absolute image/>


            <div className="register-to-heapstack">
                <span>{t('Sign up to')} </span> <Logo primary/>
            </div>
            <div className="register-container">
                <div className="register-form">
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
                    <Button primary title={t('Sign up')}/>
                    <Link className="register-link" to="/login">{t('Already have an account?')}</Link>
                </div>
            </div>
        </div>
    )
}