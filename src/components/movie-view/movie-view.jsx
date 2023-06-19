import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import Image from 'react-bootstrap/Image';
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import "./movie-view.scss";
import { useBootstrapBreakpoints } from 'react-bootstrap/esm/ThemeProvider';

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();

    const movie = movies.find((m) => m.id === movieId);

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
                    <span> Director: </span>
                    <span> {movie.director} </span>
                </div>
                <div>
                    <span> Tags: </span>
                    <span> {movie.tags} </span>
                </div>
                <div>
                    <span> Description: </span>
                    <span> {movie.description} </span>
                </div>
            </Modal.Body>

            <Modal.Footer>
            <Link to={`/`}>
                <button className="back-button">Back</button>
            </Link>
        </Modal.Footer>
        </Modal>
      </div>
    );
};

/*
export const MovieView = ({ movie, onBackClick }) => {
    return (
      <div className="modal show" style={{display: 'block', position: 'initial'}}>
        <Modal show size="md">
            <Modal.Header>
                <Modal.Title>{movie.name}</Modal.Title>
                <button 
                onClick={onBackClick}
                className="back-button"
                style={{cursor: "pointer"}}
                >
                Back
                </button>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <Image src={movie.image} fluid="true" />
                </div>
                <div>
                    <span> Director: </span>
                    <span> {movie.director} </span>
                </div>
                <div>
                    <span> Tags: </span>
                    <span> {movie.tags} </span>
                </div>
                <div>
                    <span> Description: </span>
                    <span> {movie.description} </span>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <button 
                onClick={onBackClick}
                className="back-button"
                style={{cursor: "pointer"}}
                >
                Back
                </button>
        </Modal.Footer>
        </Modal>
      </div>
    );
  };
  */