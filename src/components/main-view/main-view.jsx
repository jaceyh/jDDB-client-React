import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { SearchForm } from "../search-form/search-form";
import { ProfileView } from "../profile-view/profile-view";

export const MainView = () => {
    //keeps stored user credentials in local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");

    //keeps track of user once a user logs in and stores it in storedUser state
    const [user, setUser] = useState(storedUser? storedUser : null);
    
    //keeps track of tokens once a user logs in and stores it in storedToken state
    const [token, setToken] = useState(storedToken? storedToken : null);

    //state puts movies from API into an array
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    const [isFavorite, setIsFavorite] = useState([]);


useEffect(() => {
    console.log("MainView useEffect triggered.");
    console.log("Token: ", token);
    console.log("User: ", user)
    if (!token) return;
    fetch("https://jmdb.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
    })
        .then((response) => response.json())
        .then((data) => {
            const moviesFromApi = data.map((movie) => {
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

    const handleSearch = (searchTerm) => {
		// Filter the movies based on the search term
		const filteredMovies = movies.filter((movie) =>
			movie.name.toLowerCase().includes(searchTerm.toLowerCase())
		);

		// Update the movies state with the filtered results
		setMovies(filteredMovies);
	};


    return(
        <BrowserRouter>
            <Row className="justify-content-md-center">
                <Col md={12}>
                    <NavigationBar
                    user={user}
                    token={token}
                    setUser={setUser}
                    setToken={setToken} 
                    movies={movies}
                    onLoggedOut={() =>{
                        setUser(null)
                        setToken(null);
                        localStorage.clear();
                        window.location.reload();
                        <Navigate to="/" />
                    }}
                    />
                </Col>
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/login" />
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
                                        <LoginView 
                                        onLoggedIn={(user, token) => {
                                            setUser(user);
                                            setToken(token);
                                        }} 
                                        />
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
                                        <MovieView 
                                        movies={movies}
                                        movie={selectedMovie}
                                        user={user}
                                        setUser={setUser}
                                        />
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
                                        <LoginView onLoggedIn={(user) => {
                                            setUser(user);
                                            setToken(token);
                                        }}
                                            />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/users/:username"
                        element={
                            <Col md={5}>
                                <ProfileView 
                                    user={user}
                                    token={token}  
                                    movies={movies}
                                    isFavorite={isFavorite}
                                    setUser={setUser} />
                            </Col>
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
                                    <Stack gap={3}>
                                        <Row className="justify-content-md-center">
                                            <Col>
                                                <SearchForm onSearch={handleSearch} />
                                            </Col>
                                        </Row>
                                    </Stack>
                                    {movies.map((movie) => (
                                            <Col className="mb-5" xs={6} md={4}>
                                                <MovieCard 
                                                movie={movie}
                                                key={movie._id}
                                                setUser={setUser}
                                                token={token} />
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