import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";


function FavoriteMovies( movies, user ) {
    const favoriteMovies = movies.filter(movie => user.favoriteMovies.includes(movie._id));

    return (
        <div>
            <h1>Favorite Movies</h1>
            {favoriteMovieList.map((movie) => {
                return (
                    <Row>
                        <Col className="mb-4" key={movie.id} xl={2} lg={3} md={4} xs={6}>
                            <MovieCard movie={movie} />
                        </Col>
                    </Row>
                )
            })}
        </div>
    )
}

export default FavoriteMovies;