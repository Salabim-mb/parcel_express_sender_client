export const getCORSHeaders = (token = null) => {
    let headers = {
        "Content-Type": "application/json",
    };
    return token ? {...headers, "Authorization": "Token " + token} : headers;
};