import { useState } from "react";
import { useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

/*
export const MainView = () => {
  const [movies, setMovies] = useState([
    { 
      id: 1, 
      title: "Free Solo",
      director: "Jimmy Chin & Elizabeth Vasarhelyi",
      image: "https://lumiere-a.akamaihd.net/v1/images/docfilmswebsite_1080x1600_freesolo_91d7bed0.jpeg",
      genres: "Action, Human Interest",
      description: "Free solo is a stunning, intimate and unflinching portrait of the free soloist climber Alex Honnold, as he prepares to achieve his lifelong dream: climbing the face of the world’s most famous rock ... the 3,000ft El Capitan in Yosemite National Park ... without a rope. Celebrated as one of the greatest athletic feats of any kind, Honnold’s climb set the ultimate standard: perfection or death. Succeeding in this challenge, Honnold enters his story in the annals of human achievement. Free Solo is both an edge-of-your seat thriller and an inspiring portrait of an athlete who exceeded our current understanding of human physical and mental potential. The result is a triumph of the human spirit." 
    },
    { 
      id: 2, 
      title: "13th",
      director: "Ava Du Vernay",
      image: "https://en.wikipedia.org/wiki/13th_%28film%29#/media/File:13th_(film).png",
      genres: "Society & Culture, History",
      description: "13th is a 2016 American documentary film directed by Ava DuVernay that explores the intersection of race, justice, and mass incarceration in the United States. The title of the film refers to the Thirteenth Amendment to the United States Constitution, which outlawed slavery and involuntary servitude, with the exception of punishment for a crime. The documentary presents historical and contemporary examples of how the criminal justice system in the U.S. has been used as a tool for controlling and oppressing Black people and other people of color, from the era of slavery to the present day. The film features interviews with a range of activists, scholars, and politicians, and makes the case for significant reform of the American criminal justice system.",
    },
    { 
      id: 3, 
      title: "Citizenfour",
      director: "Laura Poitras",
      image: "https://www.themoviedb.org/t/p/original/zxXANxs9rhCckFLPedGFROYhPoN.jpg",
      genres: "Society & Culture, Technology",
      description: "Citizenfour is a 2014 documentary film directed by Laura Poitras that chronicles the events surrounding Edward Snowden's release of classified documents about the National Security Agency's (NSA) global surveillance programs. The film provides an inside look into Snowden's decision to leak the documents and the consequences he faced as a result. The documentary begins with Poitras receiving encrypted emails from a mysterious source who claims to have classified information about the NSA. The source, later revealed to be Edward Snowden, arranges to meet with Poitras and journalist Glenn Greenwald in Hong Kong to discuss the information he has leaked. Through a series of interviews with Snowden, Poitras and Greenwald, the film provides an intimate look into the discussions that took place in the days leading up to the publication of the leaked documents, as well as the aftermath of their release. It explores the legal and ethical implications of the NSA's surveillance programs, and the impact they have on civil liberties and the right to privacy. The film also highlights the personal sacrifices that Snowden made in order to expose the truth, including leaving behind his family and facing the possibility of prosecution and exile. The film's title, 'Citizenfour,' is the code name Snowden used when he first contacted Poitras. Overall, Citizenfour is a powerful and thought-provoking documentary that offers a unique and compelling perspective on one of the most significant news events of the 21st century. It sheds light on the importance of whistleblowers, government transparency, and the need for public discourse on issues of national security and civil liberties."
    },
    { 
      id: 4, 
      title: "Blackfish",
      director: "Gabriela Cowperthwaite",
      image: "https://www.themoviedb.org/t/p/original/kCk4mDFE96Mn1AYfEcbxkIiw7ND.jpg",
      genres: "Nature, Society & Culture",
      description: "Blackfish is a 2013 documentary film that explores the controversy surrounding the treatment of killer whales in captivity, specifically those at the popular marine park SeaWorld. The film focuses on the story of Tilikum, a captive killer whale that has been involved in the deaths of several people, including trainers. Through interviews with former SeaWorld trainers, scientists, and activists, the film examines the physical and emotional stress experienced by these highly intelligent creatures as well as the dangers posed to their human trainers. The filmmakers also delve into the history of killer whale capture and the subsequent rise of marine parks as a tourist attraction, highlighting the ethical and moral issues that arise from keeping these creatures in captivity. The film ultimately makes a powerful case for the release of captive orcas into the wild and the end of the practice of breeding orcas in captivity."
    }
  ]);
  */

  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.docs.map((doc) => {
          return {
            id: doc.key,
            title: doc.title,
            image:``,
            director: doc.author_name?.[0]
          };
        });
        setMovies(moviessFromApi);
      });
  },[]);
      


  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)}
    />;
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id} 
          movie={movie}          
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );