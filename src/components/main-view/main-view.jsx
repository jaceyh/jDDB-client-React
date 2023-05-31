import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);


useEffect(() => {
    console.log("useEffect triggered");
    console.log("Token: ", token);
    if (!token) return;
    fetch("https://jmdb.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Data from API: ", data);
            const moviesFromApi = data.map((movie) => {
                console.log("Movie: ", movie)
                return {
                    id: movie._id,
                    name: movie.Name,
                    director: movie.Director.join(","),
                    image: movie.ImagePath,
                    description: movie.Description,
                    tags: movie.Tags.join(",")
                }
            });
            console.log("moviesFromApi data: ", moviesFromApi)
        setMovies(moviesFromApi);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [token]);

if (!user) {
    return(
        <Row>
            <Col md={3}>
            <LoginView
                onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
                }}
                />
            </Col>
            <Col md={3}>
            or
            </Col>
            <Col md={3}>
            <SignupView />
            </Col>
        </Row>
    )
}

//Render movies data in component
    return (
    <div>
      <Row>
        <Col md={1}>
        <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
        </Col>
      </Row>
      <Row>
        {movies.map((movie) => (
            <Col className="mb-5" key={movie.id} md={4}>
            <MovieCard key={movie.id} movie={movie} onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie); }} 
            />
            </Col>
        ))}
        { selectedMovie && (
                <MovieView 
                    movie={selectedMovie} 
                    onBackClick={() => setSelectedMovie(null)} 
                />
        )}
        {movies.length === 0 && <div>The list is empty!</div>}
     </Row>
    </div>
   );
 };