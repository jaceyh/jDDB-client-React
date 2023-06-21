import React from "react";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { SettingsView } from "./user-settings";
import { FavoriteMovies } from "./favorite-movies";


export const ProfileView = ({ user, token }) => {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ birthday, setBirthday ] = useState("");

useEffect(() => {
    const getUser = () => {
        if (!token || !user) return;
        fetch(`https://jmdb.herokuapp.com/users/${user.username}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => response.json())
        .then(data => {
            const userInfo = data.map((user) => ({
                username: user.username,
                email: user.email,
                birthday: user.birthdate
              }));
        })
        .catch((error) => {
            console.log(error);
        });
    }
    getUser();
}, [token, user]);

return (
    <Container>
        <Row>
            <Col>            
                <h1>Profile</h1>
            </Col>
        </Row>
        <Row>
            <Col>
            User:
            </Col>
            <Col>
            {user.Username}
            </Col>
        </Row>
        <Row>
            <Col>
            Email:
            </Col>
            <Col>
            {user.Email}
            </Col>
        </Row>
        <Row>
            <Col>
            Birthday:
            </Col>
            <Col>
            {user.Birthdate}
            </Col>
        </Row>
        <Row>
            <Col>          
            Update something?
            </Col>
            <Col>
            <SettingsView user={user} token={token} />
            </Col>
        </Row>
        <Row>
            <Col>
            Favorite Movies
            </Col>
        </Row>
        <Row>
            <Col>
            <FavoriteMovies />
            </Col>
        </Row>
    </Container>
)};