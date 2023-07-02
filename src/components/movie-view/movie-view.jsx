import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import Image from 'react-bootstrap/Image';
import { useParams } from "react-router";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

import "./movie-view.scss";
import { FavoriteMovies } from '../profile-view/favorite-movies';
import { useBootstrapBreakpoints } from 'react-bootstrap/esm/ThemeProvider';

export const MovieView = ({ movies, user, token, updateUser }) => {
    //gets movie id from database and uses it as the parameters in the url
    const { movieId } = useParams();

    //searches through the list of database if movies and grabs the id to be displayed in the url
    const movie = movies.find((m) => m.id === movieId);

    const FavMovies = movies.filter(movie => user.FavMovies.includes(movie._id));

    const [isFavorite, setIsFavorite] = useState(user.FavMovies.includes(movie.id));

    useEffect(() => {
        setIsFavorite(user.FavMovies.includes(movieId));
        window.scrollTo(0, 0);
    }, [movieId])

    const addFavorite = () => {
        fetch(`https://jmdb.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Failed");
                return false;
            }
        })
        .then(user => {
            if (user) {
                alert("Successfully added to favorites");
                setIsFavorite(true);
                updateUser(user);
            }
        })
        .catch(e => {
            alert(e);
        });
    }

    const removeFavorite = () => {
        fetch(`https://jmdb.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Failed");
                return false;
            }
        })
        .then(user => {
            if (user) {
                alert("Successfully deleted from favorites");
                setIsFavorite(false);
                updateUser(user);
            }
        })
        .catch(e => {
            alert(e);
        });
    }

    return (
        <div className="modal show" style={{display: 'block', position: 'initial'}}>
        <Modal show size="md" >
            <Modal.Header>
                <Modal.Title>{movie.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <Image src={movie.image} fluid="true" />
                </div>
                <div>
                    <span class="fw-bold">Director:</span>
                    <span> {movie.director} </span>
                </div>
                <div>
                    <span class="fw-bold"> Tags: </span>
                    <span> {movie.tags} </span>
                </div>
                <div>
                    <span class="fw-bold"> Description: </span>
                    <span> {movie.description} </span>
                </div>
            </Modal.Body>

            <Modal.Footer>
            <Link to={`/`}>
                <button className="back-button">Back</button>
            </Link>
                {isFavorite ? 
                    <Button variant="danger" onClick={removeFavorite}>Remove from favorites</Button>
                    :<Button variant="success" onClick={addFavorite}>Add to favorites</Button> 
                }
            </Modal.Footer>
        </Modal>
      </div>
    );
};