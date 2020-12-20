import React, {useState} from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const UserContext = React.createContext({
    token: undefined,
    login: () => {},
    logout: () => {}
});

export const UserProvider = (props) => {
    const [token, setToken] = useState(cookies.get("token"));

    const user = {
        token,
        login: (newToken) => {
            cookies.set('token', newToken, {
                path: "/",
                // secure: process.env.REACT_APP_SECURE_COOKIES !== "verystrongblockadealmostimpossibletobreachomg",
                // httpOnly: process.env.REACT_APP_SECURE_COOKIES !== "verystrongblockadealmostimpossibletobreachomg",
            });
            setToken(newToken);
        },
        logout: () => {
            cookies.remove("token", {path: "/"});
            setToken(undefined);
        }
    }

    return <UserContext.Provider value={user} {...props} />
};