import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);


useEffect(() => {
    if (!token) return;
    fetch("https://jmdb-app.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
    })
        .then((response) => response.json())
        .then((data) => {
            const moviesFromApi = data.map((movie) => {
                return {
                    id: movie._id,
                    name: movie.Name,
                    image: movie.ImagePath,
                    director: movie.Director.join(","),
                    tags: movie.Tags.join(","),
                    description: movie.Description
                }
            });
        setMovies(moviesFromApi);
        })
        .catch((error) => {
            console.log("Error fetching movies:", error);
        });
    }, [token]);

if (!user) {
  return (
    <>
    <LoginView 
      onLoggedIn={(user, token) => {
      setUser(user); 
      setToken(token);
    }} />
    or
  <SignupView />
  </>
  )
}

//Render movies data in component
    return (
      <div>
        <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie); }} />
        ))}
        {selectedMovie && (
          <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        )}
        {movies.length === 0 && <div>The list is empty!</div>}
      </div>
    );
  };
