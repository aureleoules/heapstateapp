import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RouterState } from 'react-router-redux';
import { oauthActions } from '../../../actions';
import Logo from '../../../components/Logo';
import styles from './callback.module.scss';

function Callback(props: any) {

    const {t} = useTranslation();

    interface RootState {
        router: RouterState
    }

    const router: RouterState = useSelector((state: RootState) => state.router);
    const dispatch = useDispatch();

    useEffect(() => {
        const location: any = router.location;
        const code = location.query.code;
        dispatch(oauthActions.authenticate_github(code));
    }, [dispatch, router.location]);
    
    return (
        <div className={styles.callback}>
            <Logo image small/>
            <Logo primary/>
            <h2>{t('Authorized...')}</h2>
        </div>
    )
}

export default Callback;