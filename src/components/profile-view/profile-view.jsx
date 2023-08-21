import React from "react";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { MainView } from "../main-view/main-view";
import { SettingsView } from "./user-settings";
import { FavoriteMovies } from "./favorite-movies";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, token, movies }) => {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ birthday, setBirthday ] = useState("");
    const [ isFavorite, setIsFavorite ] = useState("");
    const movieId = useState("");
    const [favoriteMovies, setFavoriteMovies] = useState("");
    const [ userInfo, setUserInfo ] = useState("");


    console.log("user:", user);
/*
useEffect(() => {
    const getUser = () => {
        if (!token || !user) return;
        fetch(`https://jmdb.herokuapp.com/users/${user.Username}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => response.json())
        .then(data => {
            console.log("User Data from API: ", data);
            const userInfo = {
                username: data.Username,
                email: data.Email,
                birthday: data.Birthdate,
                FavMovies: data.FavMovies /*data.FavMovies.map((movies) => movie={movies})*/ /*
                };
              console.log("User Info:", userInfo);
              setFavoriteMovies(data.FavMovies);
              setUserInfo(userInfo);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    getUser();
}, [token, user]);
*/

return (
    <Container>
        <Row>
            <Col>            
                <h1>{user.Username}'s Profile</h1>
            </Col>
        </Row>
        <Row>
            <Col>
                <Card>
                    <Card.Body>
                        <h2>User Information</h2>
                        <p><span class="fw-bold">Username:</span> {user.Username}</p>
                        <p><span class="fw-bold">Email:</span> {user.Email}</p>
                        <p><span class="fw-bold">Birthday:</span> {user.Birthdate}</p>
            </Card.Body>
            </Card>
            </Col>
            <Col>
                <Card>
                    <Card.Body>
                        <h2>Update Something?</h2>
                        <p><SettingsView user={user} token={token}/></p>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col>
                <Card>
                    <Card.Body>
                        <h2>Favorite Movies</h2>
                        <div>{user.favMovies}
                        </div>
                        {/*{
                        <FavoriteMovies user={userInfo} token={token} movies={movies} favoriteMovies={favoriteMovies} isFavorite={isFavorite} />
                        }*/}
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
)};