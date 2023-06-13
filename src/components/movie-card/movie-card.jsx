import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card className="h-100" onClick={() => onMovieClick(movie)} variant="link">
            <Card.Img variant="top" src={movie.image} />
            <Card.Body>
                <Card.Title>{movie.name}</Card.Title>
                <Card.Text>
                    <p>{movie.director}</p>
                    <p>{movie.tags}</p>
                </Card.Text>
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
  }),
  onMovieClick: PropTypes.func.isRequired
};

  