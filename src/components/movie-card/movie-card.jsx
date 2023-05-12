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
    Id: PropTypes.string,
    Name: PropTypes.string.isRequired,
    Director: PropTypes.array,
    ImagePath: PropTypes.string,
    Tags: PropTypes.array,
    Description: PropTypes.string.isRequired
  }),
  onMovieClick: PropTypes.func.isRequired
};

  