import React, { useState } from 'react';
import './styles.scss';

import {userActions} from '../../actions';

import Logo from '../../components/Logo';
import Input from '../../components/Input';
import Button from '../../components/Button';

import {Link} from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Axios from 'axios';

export default function Register() {

    const {t} = useTranslation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    function submit(e: any) {
        e.preventDefault();
        dispatch(userActions.register(email, password));
    }

    Axios.get('/').then(response => {
        console.log(response.data);
    });

    return (
        <div className="route register">

            <Logo absolute image/>


            <div className="register-to-heapstack">
                <span>{t('Sign up to')} </span> <Logo primary/>
            </div>
            <div className="register-container">
                <form className="register-form" onSubmit={submit}>
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
                    <Button submit primary title={t('Sign up')}/>
                    <Link className="register-link" to="/login">{t('Already have an account?')}</Link>
                </form>
            </div>
        </div>
    )
}