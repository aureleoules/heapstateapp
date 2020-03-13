import axios from 'axios';

import Users from './users';
import GitHub from './github';
import Deployments from './deployments';

axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;

if(localStorage.getItem("jwt")) {
    axios.defaults.headers = {
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`
    };
}

const Client = {
    Users,
    GitHub,
    Deployments
};

export default Client;