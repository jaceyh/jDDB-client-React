import React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const SettingsView = ({ user, token, updateUser, onLoggedOut}) => {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ birthday, setBirthday ] = useState("");


    const updateUserInfo = (event) => {
        event.preventDefault();

        const data = {
            username,
            password,
            email,
            birthday
        }

        fetch(`https://jmdb.herokuapp.com/users/${user.username}`, {
        method: "PUT",
        headers: 
            { Authorization: `Bearer ${token}`,
            "Content Type": "application/json" },
        body: JSON.stringify(data),
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Update failed.");
                return false;
            }
        })
        .then((user) => {
        if (user) {
            alert("Update successful.");
            updateUser(user);
        }
        })
        .catch(e => {
            alert(e);
        });
    }

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
        <Form className='profile-form' onSubmit={updateUserInfo}>
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    minLength="4"
                    maxLength="24"
                    required
                />
            </Form.Group>

        <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength="8"
                    required
                />
        </Form.Group>

        <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
                <Form.Control
                    type="email"
                    value={email}                  
                    placeholder="user@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
        </Form.Group>

        <Form.Group controlId="formBirthday">
            <Form.Label>Birthday:</Form.Label>
                <Form.Control
                    type="date"
                    value={birthday}
                    defaultValue="mm/dd/yyyy"
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                />
        </Form.Group>
        <Button type="submit">Submit</Button>
        <Button variant="danger" onClick={deleteAccount}>
        Delete Account
      </Button>
    </Form>
)}
