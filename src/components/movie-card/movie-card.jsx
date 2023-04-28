import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <div
        onClick={() => {
          onMovieClick(movie);
        }}
      >
        {movie.name}
      </div>
    );
  };

// Here is where we define all the props constraints for the BookCard
MovieCard.PropTypes = {
  movie: PropTypes.shape({
    Id: PropTypes.string,
    Name: PropTypes.string.isRequired,
    Director: PropTypes.string,
    ImagePath: PropTypes.string,
    Tags: PropTypes.string,
    Description: PropTypes.string.isRequired
  }),
  onMovieClick: PropTypes.func.isRequired
};

  