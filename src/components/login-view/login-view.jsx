import React from "react";
import { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDob] = useState("");
    const handleSubmit = (event) => {
    //this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
        access: username, email, date,
        secret: password
    };

    fetch("https://jmdb-app.heroku.com/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        //transforms the response content into a JSON object that your code can use to extract the JWT sent by the API
        .then((response) => response.json())
        
        .then((data) => {
            console.log("Login response: ", data);
            if (data.user) {
                onLoggedIn(data.user, data.token);
            }else{
                alert("No such user.");
            }
            if (response.ok) {
                onLoggedIn(username);
        } else {
        alert("Login failed");
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