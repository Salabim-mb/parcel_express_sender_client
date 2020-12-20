import React, {useContext, useState} from 'react';
import be from "../../constants/backend";
import {getCORSHeaders} from "../../utils/getCORSHeaders";
import {Alert, Button, Card, Container, Form, FormGroup} from "react-bootstrap";
import {UserContext} from "../../context/UserContext";
import {path_list} from "../../constants/routes";
import {IndexLinkContainer} from "react-router-bootstrap";
import {Redirect} from 'react-router-dom';

const logMeIn = async (data) => {
    const url = be.API_LOGIN;
    const headers = getCORSHeaders();

    const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers
    });

    if (res.status === 200) {
        return await res.json()
    } else {
        throw await res.json()
    }
};

const LoginPage = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [alertText, setAlertText] = useState("");
    const [correct, setCorrect] = useState(false);
    const [error, setError] = useState(false);
    const [validated, setValidated] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const user = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidated(true);
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            setLoading(true);
            try {
                let res = await logMeIn({
                    login: login,
                    password: password
                });
                user.login(res.token);
                setAlertText(res?.message || "Login succeeded");
                setCorrect(true);
                setTimeout(() => setRedirect(true), 1500)
            } catch(ex) {
                setAlertText(ex?.message || "Login failed");
                setError(true);
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <Container>
            <Card>
                <Card.Header>Log in</Card.Header>
                <Card.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <FormGroup controlId="login">
                            <Form.Label>Login:</Form.Label>
                            <Form.Control
                                name="login"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                required
                                type="text"
                            />
                        </FormGroup>
                        <FormGroup controlId="password">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                type="password"
                            />
                        </FormGroup>
                        <Button type="submit" disabled={loading} variant="success">Log me in!</Button>
                    </Form>
                    <IndexLinkContainer to={path_list.REGISTER}><p>Don't have an account? Sign up!</p></IndexLinkContainer>
                    {error && <Alert variant="danger" fullWidth>{alertText}</Alert>}
                    {correct && <Alert variant="success" fullWidth>{alertText}</Alert>}
                </Card.Body>
                {redirect && <Redirect to={path_list.PARCEL_LIST} />}
            </Card>
        </Container>
    )
};

export default LoginPage;