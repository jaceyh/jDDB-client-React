import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthdate, setBirthdate] = useState("");

    const handleSubmit = (event) => {
    event.preventDefault();
    
    const data = {
        Username: username,
        Password: password,
        Email: email,
        Birthdate: birthdate
    };

    fetch("https://54.87.97.178/users", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        if (response.ok) {
            alert("Signup successful");
            window.location.reload();
        } else {
            alert("Signup failed");
        }
    });
};

return (
    <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                minLength="4"
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

        <Form.Group controlId="formBirthdate">
            <Form.Label>Birthdate:</Form.Label>
            <Form.Control
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                required
            />
        </Form.Group>
        <Button type="submit">Submit</Button>
    </Form>
  );
};