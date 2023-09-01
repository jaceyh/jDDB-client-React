import React from "react";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { MainView } from "../main-view/main-view";
import { SettingsView } from "./user-settings";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const ProfileView = ({ user, token, movies }) => {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ birthday, setBirthday ] = useState("");
    const [ isFavorite, setIsFavorite ] = useState("");
    const [favoriteMovies, setFavoriteMovies] = useState("");

    //gets movie id from database and uses it as the parameters in the url
    const { movieId } = useParams();

    console.log("user:", user);
    console.log("movies: ", movies);


    const favMovies = movies.filter((movie) => user.FavMovies.includes(movie.id));
    console.log("favMovies: ", favMovies);
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
                        <p><span class="fw-bold">Birthday:</span> {user.Birthdate.slice(0,10)}</p>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card>
                    <Card.Body>
                        <h2>Update Something?</h2>
                        <p><SettingsView 
                            user={user}
                            token={token}
                            movies={movies}
                            setUser={setUser} />
                        </p>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col>
                <Card>
                    <Card.Body>
                        <h2>Favorite Movies</h2>
                        {favMovies&&favMovies.map((movie) => (
                        <Col>
                            <MovieCard  
                            movie={movie} 
                            user={user} 
                            token={token}
                            key={movie._id} />
                        </Col>
                        ))}
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
)};