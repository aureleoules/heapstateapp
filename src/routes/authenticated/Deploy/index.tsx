import React, { useState, useEffect } from 'react';
import deploy from './deploy.module.scss';
import Button from '../../../components/Button';

import { useTranslation } from 'react-i18next';

import {ReactComponent as GitHubIcon} from '../../../assets/svg/github.svg';
import {ReactComponent as GitLabIcon} from '../../../assets/svg/gitlab.svg';
import {ReactComponent as BitBucketIcon} from '../../../assets/svg/bitbucket.svg';
import {ReactComponent as SearchIcon} from '../../../assets/svg/search.svg';
import Input from '../../../components/Input';

import Provider from '../../../types/provider';

import Client from '../../../httpClient';
import Repository from '../../../components/Repository';

import sample from '../../../sample.json';
import { Link } from 'react-router-dom';
import Deployment from '../../../types/deployment';

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

        // setProvider(Provider.GitHub);

        // setRepos(sample);
        // setFilteredRepos(sample);
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
        const deployment: Deployment = {
            token,
            branch,
            name: selectedRepo.name,
            owner: selectedRepo.owner.login,
            provider: provider
        }
        console.log(deployment);
    }

    return (
        <div className={"route " + deploy.deploy}>
            <div className={deploy.container}>
                <div className={deploy.deployment}>
                    <h2>{t('Deploy an app')}</h2>
                    <p>{t('Deploy your application on heapstack in three simple steps.')}</p>
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
                                    <Input value={filter} onChange={updateFilter} placeholder={t('Search')}/>
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
                                
                            {provider !== Provider.None && selectedRepo && validRepo && <div className={deploy.step}>
                                <h3>{t('Deploy options')}</h3>
                                <p>{t('Configure deployment options for your app.')}</p>
                                <Input onChange={(e: any) => setBranch(e.target.value)} label={t("Branch")} value={branch} placeholder={t("Branch")}/>
                                <div className={deploy.submitButtons}>
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
                                        title={"Deploy"}
                                        primary
                                        width={"65%"}
                                    />
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Deploy;