import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { ProfileView } from "./profile-view";

export const FavoriteMovies = ({ movies, user, token, isFavorite }) => { 
    console.log("movies (passed as prop in favorite-movies.jsx): ", movies);
    console.log("user (passed as prop in favorite-movies.jsx): ", user);
    console.log("token (passed as prop in favorite-movies.jsx): ", token);
    console.log("isFavorite (passed as prop in favorite-movies.jsx): ", isFavorite );
    const { movieId } = useParams();

    //const movie = movies.find((movie) => movie._id === movieId);

    //const FavMovies = movies.filter((movie) => user.FavMovies.includes(movie._id));

    const FavMovies = user.FavMovies; 

    //const [isFavorite, setIsFavorite] = useState(user.FavMovies.includes(movie._id));

    /* useEffect(() => {
        setIsFavorite(user.FavMovies.includes(movieId));
    }, [movieId])
    */

    return (
        <Row>
            {FavMovies.map((movie) => {
                return (
                    <Row>
                        <Col className="mb-4" key={movie._id} xl={2} lg={3} md={4} xs={6}>
                            <MovieCard movie={movie} />
                        </Col>
                    </Row>
                )
            })}
        </Row>
    )
}

export default FavoriteMovies;