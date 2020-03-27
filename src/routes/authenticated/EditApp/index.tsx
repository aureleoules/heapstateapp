import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { appActions } from '../../../actions';
import BuildView from '../../../components/Build';
import Button from '../../../components/Button';
import ContainerStatsView from '../../../components/ContainerStats';
import Navbar from '../../../components/Navbar';
import StatusIcon from '../../../components/StatusIcon';
import App from '../../../types/app';
import AppState from '../../../types/app_state';
import Build from '../../../types/build';
import ContainerStats from '../../../types/container_stats';
import { Providers } from '../../../types/provider';
import { formatBytes } from '../../../utils/maths';
import styles from './edit-app.module.scss';


dayjs.extend(relativeTime);

function EditApp(props: any) {
    
    const {t} = useTranslation();
    const dispatch = useDispatch();

    interface RootState {
        apps: any
    }
    const appReducer: any = useSelector((state: RootState) => state.apps);
    
    const app: App = appReducer.app;
    const builds: Array<Build> = appReducer.builds;
    
    const {name} = useParams();
    useEffect(() => {
        dispatch(appActions.fetchApp(name!))
        dispatch(appActions.fetchBuilds(name!))
        dispatch(appActions.fetchStats(name!));
    }, [dispatch, name]);

    const stats: ContainerStats = appReducer.stats;
    function start() {
        dispatch(appActions.startApp(name!));
    }

    function restart() {
        dispatch(appActions.restartApp(name!));
    }

    function stop() {
        dispatch(appActions.stopApp(name!));
    }

    return (
        <>
            <Navbar app/>
            <div className={styles['edit-app'] + " route"}>
                {appReducer.app && <div className={styles.container}>
                    <div className={`${styles['app-infos']} container multi`}>
                        <div className="container-left">
                            <h3>{app.name}</h3>
                            <a rel="noopener noreferrer" target="_blank" href={"https://" + app.url}>{app.url}</a>
                            <p>
                                <StatusIcon error={app.last_build?.error !== ""} stopped={app.state === AppState.Stopped} success={app.state === AppState.Running}/> 
                                {app.state === AppState.Stopped && <>{t('Currently idle')}. </>}
                                {app.state === AppState.Running && <>{t('Deployed from')} {Providers[app.provider!]}. </>}
                                {t('Last build')} {dayjs(app.last_build?.created_at).fromNow()}.
                            </p>

                            <div className={`${styles.actions}`}>
                                <Button external href={`https://${app.name}.heapstate.com`} target="_blank" small primary title={t('Open')}/>
                                <Button href={`/apps/${name}/options`} rel="noopener noreferrer" small primary title={t('Build settings')}/>
                                <Button target="_blank" external href={`${app.complete_url}/blob/${app.build_options?.branch}/Dockerfile`} small title={t('Dockerfile')}/>
                            </div>
                        </div>
                        <div className={`container-right relative ${styles['container-actions']}`}>
                            <h3>{t('Actions')}</h3>
                            <p>{t('Control your heapstate container.')}</p>
                            <div className={`${styles.actions} ${styles.bottom}`}>
                                {app.state === AppState.Stopped && <Button onClick={start} small primary title={t('Start')}/>}
                                {app.state === AppState.Running && <Button primary onClick={restart} small title={t('Restart')}/>}
                                {app.state === AppState.Running && <Button onClick={stop} small title={t('Stop')}/>}
                                <Button href={`/apps/${name}/logs`} small title={t('View logs')}/>
                            </div>
                        </div>
                    </div>
                    <div className={`container-row`}>
                        <div className={`${styles['recent-builds']} container`}>
                            <h3>{t('Builds')}</h3>
                            <div className={styles.builds}>
                                {builds.map((b, k) => (
                                    <BuildView url={`/apps/${name}/builds/${b.id}`} key={k} build={b}/>
                                ))}
                            </div>
                            <Button href={`/apps/${name}/builds`} title={t('See all')}/>
                        </div>

                        <div className={`container ${styles.usage}`}>
                            <h3>{t('Usage')}</h3>
                            {stats && <ContainerStatsView max_ram={formatBytes(stats.max_ram)} ram_usage={formatBytes(stats.ram_usage)}/>}
                        </div>
                    </div>
                </div>}
            </div> 
        </>
    )
}

export default EditApp;