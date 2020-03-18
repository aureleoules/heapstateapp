import React from 'react';
import Navbar from '../../../components/Navbar';

import styles from './profile.module.scss';
import { useTranslation } from 'react-i18next';


function Profile(props: any) {

    const {t} = useTranslation();

    return (
        <>
            <Navbar/>
            <div className={`route ${styles.profile}`}>
                <div className="container">
                    <h3>{t('Profile')}</h3>
                </div>
            </div>
        </>
    )
}

export default Profile;