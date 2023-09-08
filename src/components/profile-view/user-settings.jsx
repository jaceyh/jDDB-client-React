import React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

import { MainView } from "../main-view/main-view";
import { ProfileView } from "./profile-view";

export const SettingsView = ({ user, token, setUser }) => {
    const [ username, setUsername ] = useState(user.Username);
    const [ password, setPassword ] = useState("");
    const [ email, setEmail ] = useState(user.Email);
    const [ birthdate, setBirthdate ] = useState(user.Birthdate);


    console.log("user: ", user);
    console.log("token: ", token);

    const handleUpdate = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthdate: birthdate,
        };
    
        if (!token || !user) return;

        console.log(`https://jmdb.herokuapp.com/users/${user.Username}` )
        fetch(`https://jmdb.herokuapp.com/users/${user.Username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: { Authorization: `Bearer ${token}`,
            "Content Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                alert("Update failed.")
            }
        }).then((data) => {
            if (data) {
                localStorage.setItem("user", JSON.stringify(data));
                setUser(data);
            }
        })
    };

    const deleteAccount = () => {
        fetch(`https://jmdb.herokuapp.com/users/delete/${user.username}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            if (response.ok) {
                alert("Your account has been deleted. Good Bye!");
                onLoggedOut();
            } else {
                alert("Could not delete account");
            }
        })
        .catch(e => {
            alert(e);
        });
    }

    return (
        <Form className='profile-form' onSubmit={handleUpdate}>
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    defaultValue={user.username}
                    onChange={(e) => setUsername(e.target.value)}
                    minLength="4"
                    maxLength="24"
                    placeholder="Your username must be a minimum of 4 characters."
                />
            </Form.Group>

        <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength="8"
                    placeholder="Your password must be a minimum of 8 characters."
                />
        </Form.Group>

        <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
                <Form.Control
                    type="email"
                    value={email}                  
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@example.com"
                />
        </Form.Group>

        <Form.Group controlId="formBirthdate">
            <Form.Label>Birthdate:</Form.Label>
                <Form.Control
                    type="date"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    placeholder="mm/dd/yyyy"
                />
        </Form.Group>
        <Button type="submit" onClick={handleUpdate}>Submit</Button>
        <Button variant="danger" onClick={deleteAccount}>Delete Account</Button>
    </Form>
)}