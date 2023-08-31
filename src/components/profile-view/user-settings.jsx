import React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

import { MainView } from "../main-view/main-view";
import { ProfileView } from "./profile-view";

export const SettingsView = ({ user, setToken }) => {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ birthday, setBirthday ] = useState("");
    const [ updatedUser, setUpdatedUser ] = useState("");

    const data = {
        Username: username,
        Password: password,
        Email: email,
        Birthdate: birthday,
        FavMovies: [],
    };

    console.log("user: ", user);

    const handleUpdate = (event) => {
        console.log("THIS IS A TEST");
        //event.preventDefault();
        if (!token || !user) return;
        console.log(`https://jmdb.herokuapp.com/users/${user.Username}`)
        fetch(`https://jmdb.herokuapp.com/users/${user.Username}`, {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}`,
        "Content Type": "application/json",
            },
            //body: JSON.stringify(user)
        })
        .then((response) => response.json())
        .then(data => {
            console.log("Updated User Data from SettingsView: ", data);
        })
        .then((user) => {
        if (user) {
            alert("Update successful.");
            setUpdatedUser(true);
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
        <Form className='profile-form' onSubmit={handleUpdate}>
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
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

        <Form.Group controlId="formBirthday">
            <Form.Label>Birthday:</Form.Label>
                <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    placeholder="mm/dd/yyyy"
                />
        </Form.Group>
        <Button type="submit" onClick={updatedUser}>Submit</Button>
        <Button variant="danger" onClick={deleteAccount}>Delete Account</Button>
    </Form>
)}