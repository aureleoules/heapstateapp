import Slider from 'rc-slider';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { appActions } from '../../../actions';
import Button from '../../../components/Button';
import ContainerStatsView from '../../../components/ContainerStats';
import Navbar from '../../../components/Navbar';
import ContainerOptions from '../../../types/container_options';
import ContainerStats from '../../../types/container_stats';
import { formatBytes } from '../../../utils/maths';
import styles from './container.module.scss';

function Container(props: any) {

    const {t} = useTranslation();

    const dispatch = useDispatch();

    const {name} = useParams();

    useEffect(() => {
        dispatch(appActions.fetchContainerOptions(name!));
        dispatch(appActions.fetchStats(name!));
    }, [dispatch, name]);

    interface RootState {
        apps: any
    }
    const appReducer: any = useSelector((state: RootState) => state.apps);
    
    const stats: ContainerStats = appReducer.stats;
    const containerOptions: ContainerOptions = appReducer.container_options;
    const max_ram: number = appReducer.max_ram;
    

    function save() {

        const containerOptions: ContainerOptions = {
            max_ram
        }

        dispatch(appActions.saveContainerOptions(name!, containerOptions));
    }

    return (
        <>
            <Navbar app/>
            <div className={`route ${styles.container}`}>
                {containerOptions && <div className={"container-row"}>
                    <div className="container">
                        <h3>{t('Container')}</h3>
                        <p>{t('Configure your heapstate container to your needs.')}</p>
                        <div className={styles.ram}>
                            <p>
                                RAM: {formatBytes(max_ram)} MB<br/>
                            </p>
                            <Slider
                                trackStyle={{
                                    backgroundColor: "#ff2763",
                                }} 
                                step={8 * 1024 * 1024} 
                                max={1024 * 1024 * 1024} 
                                min={8 * 1024 * 1024} 
                                value={max_ram}
                                onChange={value => dispatch(appActions.setContainerRAM(value))}
                                handleStyle={{
                                    borderColor: "#ff2763"
                                }}
                            />
                        </div>
                        <Button onClick={save} primary title={t('Save')}/>
                    </div>
                    <div className="container">
                        <h3>{t('Container usage')}</h3>
                        {stats && <ContainerStatsView max_ram={formatBytes(stats.max_ram)} ram_usage={formatBytes(stats.ram_usage)}/>}
                    </div>
                </div>}
            </div>
        </>
    )
}

export default Container;