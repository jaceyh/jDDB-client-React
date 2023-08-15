import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import Image from 'react-bootstrap/Image';
import { useParams } from "react-router";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';


import "./movie-view.scss";

import { FavoriteMovies } from '../profile-view/favorite-movies';
import { updateUser } from '../profile-view/user-settings';
import { useBootstrapBreakpoints } from 'react-bootstrap/esm/ThemeProvider';

export const MovieView = ({ movies, user, updateUser }) => {

    const storedToken = localStorage.getItem("token");
    const [token, setToken] = useState(storedToken? storedToken : null);

    //gets movie id from database and uses it as the parameters in the url
    const { movieId } = useParams();

    //searches through the list of database if movies and grabs the id to be displayed in the url
    const movie = movies.find((movie) => movie.id === movieId);
    //this `movie.id` comes from movie-card.jsx ... idk why

    const FavMovies = movies.filter(movie => user.FavMovies.includes(movieId));

    const [isFavorite, setIsFavorite] = useState();

    console.log("movies in movie-view.jsx:", movies);
    console.log("movie in movie-view.jsx: ", movie);
    console.log("movieId in movie-view.jsx: ", movieId);

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
        fetch(`https://jmdb.herokuapp.com/users/${user.Username}/movies/delete/${movieId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Failed to remove from favorites.");
                return false;
            }
        })
        .then(user => {
            if (user) {
                alert("Successfully removed from favorites");
                setIsFavorite(false);
                //updateUser(user);
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