import React, {useState} from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const UserContext = React.createContext({
    token: undefined,
    data: undefined,
    type: undefined,
    login: () => {},
    logout: () => {}
});

export const UserProvider = (props) => {
    const [token, setToken] = useState(cookies.get("token"));
    const [data, setData] = useState(cookies.get("data"));

    const user = {
        token,
        data,
        login: (newToken, newData) => {
            cookies.set('token', newToken, {
                path: "/",
                // secure: process.env.REACT_APP_SECURE_COOKIES !== "verystrongblockadealmostimpossibletobreachomg",
                // httpOnly: process.env.REACT_APP_SECURE_COOKIES !== "verystrongblockadealmostimpossibletobreachomg",
            });
            setToken(newToken);
            cookies.set('data', newData, {
                path: "/",
                // secure: process.env.REACT_APP_SECURE_COOKIES !== "verystrongblockadealmostimpossibletobreachomg",
                // httpOnly: process.env.REACT_APP_SECURE_COOKIES !== "verystrongblockadealmostimpossibletobreachomg",
            });
            setData(newData);
        },
        logout: () => {
            cookies.remove("token", {path: "/"});
            cookies.remove("data", {path: "/"});
            setToken(undefined);
            setData(undefined);
        }
    }

    return <UserContext.Provider value={user} {...props} />
};