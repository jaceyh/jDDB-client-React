import React from "react";
import { useState } from "react";

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const handleSubmit = (event) => {
    event.preventDefault();
    
    const data = {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
    };

    fetch("https://jmdb-app.herokuapp.com/", {
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
    <form onSubmit={handleSubmit}>
        <label>
            Username:
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                minLength="6"
                required
            />
        </label>
        <label>
            Password:
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength="8"
                required
            />
        </label>
        <label>
            Email:
            <input
                id="emailAddress"
                type="email"
                value={email}
                placeholder="user@example.com"
                onChange={(e) => setEmail(e.target.value)}
                required
            />
        </label>
        <label>
            Date of Birth:
            <input
                id="dob"
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
            />
        </label>
        <button type="submit">Submit</button>
    </form>
  );
};