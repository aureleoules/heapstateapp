import React, { useEffect, useState } from 'react';

import styles from './container.module.scss';
import Navbar from '../../../components/Navbar';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { appActions } from '../../../actions';
import { useParams } from 'react-router';
import Slider from 'rc-slider';
import ContainerStats from '../../../types/container_stats';
import ContainerOptions from '../../../types/container_options';
import Button from '../../../components/Button';
import ContainerStatsView from '../../../components/ContainerStats';
import { stat } from 'fs';

function Container(props: any) {

    const {t} = useTranslation();

    const dispatch = useDispatch();

    const {name} = useParams();

    useEffect(() => {
        dispatch(appActions.fetchContainerOptions(name!));
        dispatch(appActions.fetchStats(name!));
    }, []);

    interface RootState {
        apps: any
    }
    const appReducer: any = useSelector((state: RootState) => state.apps);
    
    const stats: ContainerStats = appReducer.stats;
    const containerOptions: ContainerOptions = appReducer.container_options;
    const max_ram: number = appReducer.max_ram;
    
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
                                RAM: {max_ram} MB<br/>
                                {t('Price')}: {max_ram / 8} sats / h
                            </p>
                            <Slider
                                trackStyle={{
                                    backgroundColor: "#ff2763",
                                }} 
                                step={8} 
                                max={1024} 
                                min={8} 
                                value={max_ram}
                                onChange={value => dispatch(appActions.setContainerRAM(value))}
                                handleStyle={{
                                    borderColor: "#ff2763"
                                }}
                            />
                        </div>
                        <Button primary title={t('Save')}/>
                    </div>
                    <div className="container">
                        <h3>{t('Container usage')}</h3>
                        {stats && <ContainerStatsView max_ram={stats.max_ram} ram_usage={stats.ram_usage}/>}
                    </div>
                </div>}
            </div>
        </>
    )
}

export default Container;