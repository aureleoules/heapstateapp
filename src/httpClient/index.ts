import axios from 'axios';

import Users from './users';

axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;

if(localStorage.getItem("jwt")) {
    axios.defaults.headers = {
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`
    };
}

const Client = {
    Users
};

export default Client;