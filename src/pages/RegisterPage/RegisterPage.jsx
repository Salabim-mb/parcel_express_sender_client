import React, {useState} from 'react';
import be from "../../constants/backend";
import {getCORSHeaders} from "../../utils/getCORSHeaders";
import {Alert, Button, Card, Container, Form, FormGroup} from "react-bootstrap";
import {path_list} from "../../constants/routes";
import {IndexLinkContainer} from 'react-router-bootstrap';
import {Redirect} from 'react-router-dom';

const registerMe = async (data) => {
    const url = be.API_REGISTER;
    const headers = getCORSHeaders();

    const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers
    });

    if (res.status === 201) {
        return await res.json()
    } else {
        throw await res.json()
    }
};

const RegisterPage = () => {
    const [data, setData] = useState({
        company: "",
        login: "",
        password: "",
        password_rep: "",
        email: "",
        phone: ""
    });
    const [loading, setLoading] = useState(false);
    const [alertText, setAlertText] = useState("");
    const [correct, setCorrect] = useState(false);
    const [error, setError] = useState(false);
    const [validated, setValidated] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidated(true);
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            setLoading(true);
            try {
                let res = await registerMe(data);
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
                <Card.Header>Register</Card.Header>
                <Card.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <FormGroup controlId="login">
                            <Form.Label>Login:</Form.Label>
                            <Form.Control
                                name="login"
                                value={data.login}
                                onChange={(e) => setData({...data, login: e.target.value})}
                                required
                                type="text"
                            />
                        </FormGroup>
                        <FormGroup controlId="email">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                name="email"
                                value={data.email}
                                onChange={(e) => setData({...data, email: e.target.value})}
                                required
                                type="email"
                            />
                        </FormGroup>
                        <FormGroup controlId="phone">
                            <Form.Label>Phone number:</Form.Label>
                            <Form.Control
                                name="phone"
                                value={data.phone}
                                onChange={(e) => setData({...data, phone: e.target.value})}
                                required
                                type="tel"
                            />
                        </FormGroup>
                        <FormGroup controlId="company">
                            <Form.Label>Company name:</Form.Label>
                            <Form.Control
                                name="company"
                                value={data.company}
                                onChange={(e) => setData({...data, company: e.target.value})}
                                required
                                type="text"
                            />
                        </FormGroup>
                        <FormGroup controlId="password">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                name="password"
                                value={data.password}
                                onChange={(e) => setData({...data, password: e.target.value})}
                                required
                                type="password"
                            />
                        </FormGroup>
                        <FormGroup controlId="password_rep">
                            <Form.Label>Repeat password:</Form.Label>
                            <Form.Control
                                name="password"
                                value={data.password_rep}
                                onChange={(e) => setData({...data, password_rep: e.target.value})}
                                required
                                type="password"
                            />
                        </FormGroup>
                        <Button type="submit" disabled={loading} variant="success">Register!</Button>
                    </Form>
                    <IndexLinkContainer to={path_list.LOGIN}><p>Already have an account? Log in!</p></IndexLinkContainer>
                    {error && <Alert variant="danger" fullWidth>{alertText}</Alert>}
                    {correct && <Alert variant="success" fullWidth>{alertText}</Alert>}
                    {redirect && <Redirect to={path_list.LOGIN} />}
                </Card.Body>
            </Card>
        </Container>
    )
};

export default RegisterPage;