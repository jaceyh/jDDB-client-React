import React from "react";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { MainView } from "../main-view/main-view";
import { SettingsView } from "./user-settings";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const ProfileView = ({ user, token, movies, setUser }) => {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ birthdate, setBirthdate ] = useState("");
    const [ isFavorite, setIsFavorite ] = useState("");
    const [ favoriteMovies, setFavoriteMovies ] = useState("");

    //gets movie id from database and uses it as the parameters in the url
    const { movieId } = useParams();

    const favMovies = movies.filter((movie) => user.FavMovies.includes(movie.id));


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
                        <h2>Your User Info</h2>
                        <p><span class="fw-bold">Username:</span> {user.Username}</p>
                        <p><span class="fw-bold">Email:</span> {user.Email}</p>
                        <p><span class="fw-bold">Birthdate:</span> {user.Birthdate}</p>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={6} md={6}>
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
            <Col className="mb-5" md={4}>
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