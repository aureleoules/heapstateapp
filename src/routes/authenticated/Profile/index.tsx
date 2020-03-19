import React from 'react';
import Navbar from '../../../components/Navbar';

import styles from './profile.module.scss';
import { useTranslation } from 'react-i18next';
import Input from '../../../components/Input';
import { useSelector } from 'react-redux';
import UserProfile from '../../../types/user.profile';
import dayjs from 'dayjs';


function Profile(props: any) {

    const {t} = useTranslation();

    interface RootState {
        users: any
    }
    const users: any = useSelector((state: RootState) => state.users);
    
    const profile: UserProfile = users.profile;
    return (
        <>
            <Navbar/>
            <div className={`route ${styles.profile}`}>
                {profile && <div className="container">
                    <h3>{t('Profile')}</h3>
                    <Input label={t('Email')} value={profile.email} disabled/>
                    <Input label={t('Username')} value={profile.username} disabled/>
                    <p>{t('Account created')} {dayjs(profile.created_at).fromNow()}</p>
                </div>}
            </div>
        </>
    )
}

export default Profile;