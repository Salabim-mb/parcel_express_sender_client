import React, {useContext, useEffect, useState} from "react";
import be from "../../constants/backend";
import {getCORSHeaders} from "../../utils/getCORSHeaders";
import {UserContext} from "../../context/UserContext";
import {Alert, Card, Container, Form, Table} from "react-bootstrap";
import "./ParcelList.css";


const sendNotification = async(token, data) => {
    const url = be.NOTIFICATIONS;
    const headers = getCORSHeaders(token);

    const res = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({
            receiver: data.sender,
            message: "Parcel changed status to: " + data.status,
            date: (new Date()).toISOString()
        })
    })

    if (res.status === 200) {
        return await res.json();
    } else {
        throw await res.json();
    }
}

const getNotifications = async(token) => {
    const url = be.NOTIFICATIONS;
    const headers = getCORSHeaders(token);

    const res = await fetch(url, {
        method: "GET",
        headers
    });

    if (res.status === 200) {
        return await res.json();
    } else {
        throw await res.json();
    }
};

const loadParcels = async(token) => {
    const url  = be.API_PARCEL_LIST;
    const headers = getCORSHeaders(token);

    const res = await fetch(url, {
        method: "GET",
        headers
    });

    if (res.status === 200) {
        return await res.json()
    } else {
        throw await res.json()
    }
}

const updateParcel = async(token, data) => {
    const url = be.API_PARCEL(data.id)
    const headers = getCORSHeaders(token)

    const res = await fetch(url, {
        method: "PUT",
        headers,
        body: JSON.stringify(data)
    });

    if (res.status === 200) {
        return await res.json()
    } else {
        throw await res.json()
    }
};

const ParcelList = () => {
    const [parcels, setParcels] = useState([]);
    const [error, setError] = useState(false);
    const [alertText, setAlertText] = useState("");
    const [loading, setLoading] = useState(false);
    const [putSuccess, setPutSuccess] = useState(false);
    const [putError, setPutError] = useState(false);
    const [notificationFlag, setNotificationFlag] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const user = useContext(UserContext);
    const statuses = ["Not assigned", "Confirmed", "Hit the road", "Awaiting", "Delivered"]

    useEffect(() => {
        const loadParcelList = async() => {
            try {
                setLoading(true);
                let res = await loadParcels(user.token);
                setParcels(res?.parcels || {});
            } catch (ex) {
                setAlertText(ex.message);
                setError(true);
            } finally {
                setLoading(false);
                setNotificationFlag(true);
            }
        }
        loadParcelList();
    }, [user.token])

    useEffect(() => {
        const handleLoadingNots = async() => {
            setNotificationFlag(false);
            try {
                let {notifications} = await getNotifications(user.token);
                setNotifications(notifications);
                setTimeout(() => setNotifications([]), 5000);
            } catch(ex) {
                console.log(ex);
            } finally {
                setTimeout(() => setNotificationFlag(true), 3000);
            }
        }
        if (notificationFlag) {
            handleLoadingNots();
        }
    }, [notificationFlag])

    const handleUpdate = async (e, data) => {
        e.preventDefault();
        setPutError(false);
        setPutSuccess(false);
        try {
            let res = await updateParcel(user.token, data);
            setAlertText(res.message);
            try {
                let notres = await sendNotification(user.token, data);
                console.log(notres)
            } catch(exc) {
                console.log(exc)
            }
            setPutSuccess(true);
        } catch(ex) {
            setAlertText(ex.message);
            setPutError(true);
            e.stopPropagation();
        }
    };

    return (
        <Container>
            <Card>
                <Card.Header>Manage parcels</Card.Header>
                {error ? (
                    <Alert variant="danger">{alertText}</Alert>
                ) : loading ? (
                    <Alert variant="info">Loading...</Alert>
                ) : (
                    <Card.Body>
                        {parcels.length === 0 ? (
                            <Alert variant="info">No parcels :(</Alert>
                        ) : (
                            <>
                                {putSuccess && <Alert variant="success">{alertText}</Alert>}
                                {putError && <Alert variant="danger">{alertText}</Alert>}
                                <Table striped bordered hover>
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Receiver's PO box</th>
                                        <th>Sender</th>
                                        <th>Label</th>
                                        <th>Size</th>
                                        <th>Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {parcels.map((parcel, idx) => (
                                        <tr key={idx}>
                                            <td>{idx}</td>
                                            <td>{parcel?.custom_label || "None"}</td>
                                            <td>{parcel?.sender || "Anonymous"}</td>
                                            <td>{parcel?.receiver || "Not specified"}</td>
                                            <td>{parcel?.size || "None"}</td>
                                            <td>
                                                <Form.Control
                                                    as="select"
                                                    type="text"
                                                    defaultValue={parcel.status}
                                                    onChange={(e) => handleUpdate(e, {...parcel, status: e.target.value})}
                                                >
                                                    {statuses.map((status, idx) => (
                                                        <option key={idx}>{status}</option>
                                                    ))}
                                                </Form.Control>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </>
                        )}
                        {notifications.map((n) => (
                            <Alert className="floating-alert" variant="info">{n.sender} -> New parcel! ({n.date})</Alert>
                        ))}
                    </Card.Body>
                )}
            </Card>
        </Container>
    )
};

export default ParcelList;