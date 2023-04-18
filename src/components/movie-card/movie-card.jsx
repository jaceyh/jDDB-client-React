import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <div
        onClick={() => {
          onMovieClick(movie);
        }}
      >
        {movie.title}
      </div>
    );
  };

// Here is where we define all the props constraints for the BookCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Director: PropTypes.array({
      Director: director.key,
      Director: director.key
    }),
    ImagePath: PropTypes.string,
    Tags: PropType.array({
      Tags: Tags.key,
      Tags: Tags.key
    }),
    Description: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};

  