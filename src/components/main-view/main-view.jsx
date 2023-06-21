import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";

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
                console.log("Movies: ", movie)
                return {
                    id: movie._id,
                    name: movie.Name,
                    director: movie.Director.map((director) => director.Name).join(', '),
                    image: movie.ImagePath,
                    description: movie.Description,
                    tags: movie.Tags.map((tag) => tag.Name).join(', ')
                }
            });
            console.log("moviesFromApi data: ", moviesFromApi)
        setMovies(moviesFromApi);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [token]);


    return(
        <BrowserRouter>
            <Row className="justify-content-md-center">
                <Col md={12}>
                    <NavigationBar
                    user={user}
                    onLoggedOut={() =>{
                        setUser(null)
                        setToken(null);
                        localStorage.clear();
                        window.location.reload();
                    }}
                    />
                </Col>
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <SignupView />
                                    </Col>
                                )}
                            </>

                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <LoginView onLoggedIn={(user) => setUser(user)} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>"The list is empty!"</Col>
                                ) : (
                                    <Col md={5}>
                                        <MovieView movies={movies} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/users"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/users/:Username" />
                                ) : (
                                    <Col md={5}>
                                        <LoginView onLoggedIn={(user) => setUser(user)} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>"The list is empty!"</Col>
                                ) : (
                                    <>
                                        {movies.map((movie) => (
                                            <Col className="mb-5" key={movie.id} md={4}>
                                                <MovieCard movie={movie} />
                                            </Col>
                                        ))}
                                    </>
                                )}
                            </>
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};

     /*   leaving this in case I need for setting token          
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
*/

/*
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
 */