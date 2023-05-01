import React from "react";
import { useState } from "react";

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDob] = useState("");
    const handleSubmit = (event) => {
    event.preventDefault();
}

return (
    <form onSubmit={handleSubmit}>
        <label>
            Username:
            <input
                id="username"
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
                id="password"
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
                value={date}
                onChange={(e) => setDob(e.target.value)}
                required
            />
        </label>
        <button type="submit">Submit</button>
    </form>
  );
};