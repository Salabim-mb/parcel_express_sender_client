import React from "react";
import path_list from "constants/routes";
import {Switch, Route, useLocation} from "react-router-dom";
import {UserContext} from "context/UserContext";

const Router = (props) => {
    const location = useLocation();
    return (
        <UserContext.Consumer>
            {() => {
                return (
                    <Switch location={location} key={location.pathname}>
                        {path_list.map(
                            ({component: Component, path, requiresLogin, ...rest}) => {
                                return (
                                    <Route path={path} key={path} {...rest}>
                                        <Component {...props} {...rest} />
                                    </Route>
                                )
                            }
                        )}
                    </Switch>
                );
            }}
        </UserContext.Consumer>
    );
};


export default Router;