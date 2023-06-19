import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
    return (
        <Card>
            <Card.Img variant="top" src={movie.image} />
            <Card.Body>
                <Card.Title>{movie.name}</Card.Title>
                <Card.Text>
                    <p>{movie.director}</p>
                    <p>{movie.tags}</p>
                </Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                    <Button variant="link">Open</Button>
                </Link>
            </Card.Body>
        </Card>
    );
  };

// Here is where we define all the props constraints for the MovieCard
MovieCard.propTypes = {
    movie: PropTypes.shape({
    _id: PropTypes.string,
    Name: PropTypes.string.isRequired,
    Director: PropTypes.string,
    ImagePath: PropTypes.string,
    Description: PropTypes.string.isRequired,
    Tags: PropTypes.string
  }).isRequired
};

  