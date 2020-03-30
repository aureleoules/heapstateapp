import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { appActions } from '../../../actions';
import { ReactComponent as BitBucketIcon } from '../../../assets/svg/bitbucket.svg';
import { ReactComponent as GitHubIcon } from '../../../assets/svg/github.svg';
import { ReactComponent as GitLabIcon } from '../../../assets/svg/gitlab.svg';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Navbar from '../../../components/Navbar';
import Repository from '../../../components/Repository';
import Client from '../../../httpClient';
import App from '../../../types/app';
import BuildOptions from '../../../types/build_options';
import ContainerOptions from '../../../types/container_options';
import Provider from '../../../types/provider';
import { formatBytes } from '../../../utils/maths';
import deploy from './deploy.module.scss';

let token: string;

function Deploy(props: any) {
    const {t} = useTranslation();

    const [provider, setProvider] = useState<Provider>(Provider.None);
    const providers = [
        {
            provider: Provider.GitHub,
            title: "GitHub",
            icon: GitHubIcon
        },
        {
            provider: Provider.GitLab,
            title: "GitLab",
            icon: GitLabIcon
        },
        {
            provider: Provider.BitBucket,
            title: "BitBucket",
            icon: BitBucketIcon
        }
    ]
    const [repos, setRepos] = useState<Array<any>>([]);
    const [filteredRepos, setFilteredRepos] = useState<Array<any>>([]);
    const [selectedRepo, setSelectedRepo] = useState<any>(null);

    const [branch, setBranch] = useState<string>("master");

    const [filter, setFilter] = useState<string>("");

    const [validRepo, setValidRepo] = useState<boolean>(false);
    const [checkingDockerfile, setCheckingDockerfile] = useState<boolean>(false);

    const [containerRAM, setContainerRAM] = useState<number>(256 * 1024 * 1024);

    const dispatch = useDispatch();

    function onProviderSelect(p: Provider) {
        setProvider(p);
        if(p === Provider.GitHub) {
            Client.GitHub.authorize();
        }
    }

    function fetchGitHubRepos() {
        Client.GitHub.fetchRepos(token).then(repositories => {
            setRepos(repositories);
            setFilteredRepos(repositories);
        }).catch(err => {
            if(err) throw err;
        });
    }
    
    useEffect(() => {
        window.addEventListener("access_token", (e:any) => {
            token = e.detail;
            fetchGitHubRepos();
        });
    }, []);

    function selectRepo(repo: any) {
        setSelectedRepo(repo);
        setCheckingDockerfile(true);
        Client.GitHub.checkDockerfile(token, repo).then(exists => {
            setValidRepo(exists);
            setCheckingDockerfile(false);
        }).catch(err => {
            if(err) {    
                setCheckingDockerfile(false);
                throw err
            };
        });

    }

    function updateFilter(e: any) {
        const value = e.target.value;
        setFilter(value);
        const rs = repos.filter(r => r.name.startsWith(value));
        setFilteredRepos(rs);
    }

    function deployApp(e: any) {

        const containerOptions: ContainerOptions = {
            max_ram: containerRAM,
        }

        const buildOptions: BuildOptions = {
            branch
        }

        const app: App = {
            container_options: containerOptions,
            complete_url: selectedRepo.html_url,
            build_options: buildOptions,
            provider: provider
        }

        dispatch(appActions.newApp(app));
    }

    interface RootState {
        users: any
    }

    return (
        <>
            <Navbar/>
            <div className={"route " + deploy.deploy}>
                <div className={deploy.container}>
                    <div className={deploy.deployment}>
                        <h2>{t('Deploy an app')}</h2>
                        <p>{t('Deploy your application on heapstate in three simple steps.')}</p>
                        <div className={deploy.chooser}>
                            <div className={deploy.steps}>
                                <div className={deploy.step}>
                                    <h3>{t('Provider')}</h3>
                                    <p>{t('Select your Git provider. This is where your code is hosted.')}</p>
                                    <div className={deploy.methods}>
                                        {providers.map((p, k) => <Button
                                            key={k}
                                            onClick={() => onProviderSelect(p.provider)}
                                            title={p.title}
                                            icon={p.icon}
                                            primary={provider === p.provider}
                                        />)}
                                    </div>
                                </div>

                                {provider !== Provider.None && repos.length > 0 && <div className={deploy.step}>
                                    <h3>{t('Repository')}</h3>
                                    <p>{t('Choose the repository you wish to deploy.')}</p>
                                    {!selectedRepo && <React.Fragment>
                                        <Input className={deploy.search} value={filter} onChange={updateFilter} placeholder={t('Search')}/>
                                        <div className={deploy.repositories}>
                                            {filteredRepos.map((repo, k) => <Repository
                                                onClick={() => selectRepo(repo)}
                                                key={k}
                                                icon={GitHubIcon}
                                                name={repo.owner.login + "/" + repo.name}
                                            />)}
                                        </div>
                                        </React.Fragment>
                                    }
                                    {selectedRepo && <React.Fragment>
                                        <Repository 
                                            icon={GitHubIcon} 
                                            name={selectedRepo.owner.login + "/" + selectedRepo.name}
                                            onClick={() => setSelectedRepo(null)}
                                            selected
                                        />
                                        {!validRepo && !checkingDockerfile && <>
                                            <p className="error">{t('Dockerfile could not be found.')}</p>
                                            <Link to="/guide">{t('How to write a Dockerfile')}</Link>
                                        </>}
                                    </React.Fragment>}
                                </div>}
                                    
                                {provider !== Provider.None && selectedRepo && <div className={deploy.step}>
                                    <h3>{t('Container options')}</h3>
                                    <p>{t('Configure your heapstate container to your needs.')}</p>
                                    
                                    <div className={deploy.ram}>
                                        <p>{t('Container RAM')}: {formatBytes(containerRAM)} MB</p>
                                        <Slider
                                            trackStyle={{
                                                backgroundColor: "#ff2763",
                                            }} 
                                            step={8 * 1024 * 1024} 
                                            max={1024 * 1024 * 1024} 
                                            min={8 * 1024 * 1024} 
                                            value={containerRAM} 
                                            onChange={value => setContainerRAM(value)}
                                            handleStyle={{
                                                borderColor: "#ff2763"
                                            }}
                                        />
                                    </div>
                                    <Input value={branch} onChange={(e: any) => setBranch(e.target.value)} label={t('Branch')}/>
                                </div>}                              

                                {provider !== Provider.None && selectedRepo && <div className={`${deploy.submitButtons} ${deploy.step}`}>
                                    <Button
                                        external
                                        href={`https://github.com/${selectedRepo.owner.login}/${selectedRepo.name}/blob/${branch}/Dockerfile`}
                                        target="_blank"
                                        title={"Dockerfile"}
                                        width={"30%"}
                                        disabled={!validRepo}
                                    />
                                    <Button
                                        onClick={deployApp}
                                        disabled={!validRepo}
                                        title={t('Deploy')}
                                        primary
                                        width={"65%"}
                                    />
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Deploy;