import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { MovieCard } from "../movie-card/movie-card";

export const FavoriteMovies = ({ movies, user }) => { 
    const { movieId } = useParams();

    const movie = movies.find((movie) => movie._id === movieId);

    const FavMovies = movies.filter(movie => user.FavMovies.includes(movie._id));

    const [isFavorite, setIsFavorite] = useState(user.FavMovies.includes(movie.id));

    useEffect(() => {
        setIsFavorite(user.FavMovies.includes(movieId));
        window.scrollTo(0, 0);
    }, [movieId])


    return (
        <Row>
            <h2>Favorite Movies</h2>
            {FavMovies.map((movie) => {
                return (
                    <Row>
                        <Col className="mb-4" key={movie.id} xl={2} lg={3} md={4} xs={6}>
                            <MovieCard movie={movie} />
                        </Col>
                    </Row>
                )
            })}
        </Row>
    )
}

export default FavoriteMovies;