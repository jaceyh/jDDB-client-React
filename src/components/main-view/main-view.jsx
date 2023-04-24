import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);


useEffect(() => {
  fetch("https://jmdb-movie-api.herokuapp.com/movies")
    .then((response) => response.json())
    .then((data) => {
      const moviesFromApi = data.movies.map((movie) => {
        return {
          id: movie.key,
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
}, []);

//Render movies data in component
    return (
      <div>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }} />
        ))}
        {selectedMovie && <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />}
        {selectedMovie && (
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        )}
        {movies.length === 0 && <div>The list is empty!</div>}
      </div>
    );
  };


