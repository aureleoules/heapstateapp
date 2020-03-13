import axios from 'axios';

const GITHUB_ENDPOINT = "https://api.github.com";

export default {
    authorize: () => {
        const url = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_ID}`;
        console.log(url);
        window.open(url, 'popup', 'width=600,height=600');
    },

    exchange_token: (code: string) => new Promise<string>((resolve, reject) => {
        axios.post('/oauth/github', {code}).then(response => {
            resolve(response.data.payload);
        }).catch(err => {
            reject(err);
        });
    }),

    fetchRepos: (token: string) => new Promise<Array<object>>((resolve, reject) => {
        axios({
            baseURL: GITHUB_ENDPOINT,
            url: "/user/repos",
            headers: {
                Authorization: `token ${token}`
            },
            params: {
                sort: "updated"
            }
        }).then(response => {
            resolve(response.data);
        }).catch(err => {
            reject(err);
        });
    }),

    checkDockerfile: (token: string, repo: any) => new Promise<boolean>((resolve, reject) => {
        axios({
            baseURL: GITHUB_ENDPOINT,
            url: `/repos/${repo.owner.login}/${repo.name}/contents/Dockerfile`,
            headers: {
                Authorization: `token ${token}`
            },
        }).then(response => {
            resolve(true);
        }).catch(err => {
            resolve(false);
        });
    })
}