import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { appActions } from '../../../actions';
import BuildView from '../../../components/Build';
import Navbar from '../../../components/Navbar';
import Build from '../../../types/build';
import styles from './builds.module.scss';


function Builds(props: any) {

    const {t} = useTranslation();
    const dispatch = useDispatch();

    interface RootState {
        apps: any
    }
    const appReducer: any = useSelector((state: RootState) => state.apps);
    
    const builds: Array<Build> = appReducer.builds;
    
    const {name} = useParams();

    useEffect(() => {
        dispatch(appActions.fetchBuilds(name!))
    }, [dispatch, name]);

    return (
        <>
            <Navbar app/>
            <div className={`route ${styles.builds}`}>
                <div className={`container`}>
                    <h3>{t('Builds')}</h3>
                    <div className={styles.builds}>
                        {builds.map((b, k) => (
                            <BuildView url={`/apps/${name}/builds/${b.id}`} key={k} build={b}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Builds;