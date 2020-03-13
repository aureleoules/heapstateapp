import axios from 'axios';

import Users from './users';
import GitHub from './github';
import Apps from './apps';

axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;

if(localStorage.getItem("jwt")) {
    axios.defaults.headers = {
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`
    };
}

const Client = {
    Users,
    GitHub,
    Apps
};

export default Client;