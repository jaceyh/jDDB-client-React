import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";


function FavoriteMovies( movies, user ) {
    const FavMovies = movies.filter(movie => user.FavMovies.includes(movie._id));

    return (
        <Row>
            <h2>Favorite Movies</h2>
            {favoriteMovieList.map((movie) => {
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