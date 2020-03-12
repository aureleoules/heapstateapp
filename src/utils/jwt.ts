export const parseJwt = (token: string) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};


export const isTokenExpired = () => {
    const token = localStorage.getItem("jwt");

    if(token) {
        const jwtData = parseJwt(token);
        const exp = jwtData.exp;
        const currentTimestamp = Math.floor(Date.now() / 1000);
        return currentTimestamp >= exp;
    }
    return true;
}

export const setJwt = (token: string) => localStorage.setItem("jwt", token); 