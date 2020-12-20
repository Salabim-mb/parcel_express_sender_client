import {Nav, Navbar} from "react-bootstrap";
import {useContext} from "react";
import {UserContext} from "context/UserContext";
import {IndexLinkContainer} from 'react-router-bootstrap';
import {useHistory} from 'react-router-dom';
import {getCORSHeaders} from "utils/getCORSHeaders";
import {path_list} from "constants/routes";
import "assets/rocket.svg";
import be from "../../constants/backend";

const logoutUser = async (token) => {
    const url = be.LOGOUT;
    const headers = getCORSHeaders(token);
    const res = await fetch(url, {
        headers,
        method: "GET"
    });

    if (res.status === 200) {
        return true;
    } else {
        throw res.status;
    }
};

const MyNavbar = () => {
    const user = useContext(UserContext);
    const history = useHistory();

    const logOut = async (e) => {
        e.preventDefault();
        await logoutUser(user.token);
        user.logout();
        history.push(path_list.DASHBOARD);
    };

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand className="mr-5">
                <img src="/assets/rocket.svg" height="30" width="30" alt="" className="mx-3"/>
                Parcel Express Client
            </Navbar.Brand>
            <Nav className="mr-auto">
                {
                    user?.token ? (
                        <>
                            <IndexLinkContainer to={path_list.PARCEL_LIST}>
                                <Nav.Link>My parcels</Nav.Link>
                            </IndexLinkContainer>
                            <Nav.Link onClick={logOut}>Log out</Nav.Link>
                        </>
                    ) : (
                        <>
                            <IndexLinkContainer to={path_list.REGISTER}>
                                <Nav.Link>Register</Nav.Link>
                            </IndexLinkContainer>
                            <IndexLinkContainer to={path_list.LOGIN}>
                                <Nav.Link>Log in</Nav.Link>
                            </IndexLinkContainer>
                        </>
                    )
                }
            </Nav>
        </Navbar>
    )
}

export default MyNavbar;