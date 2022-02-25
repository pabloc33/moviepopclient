import axios from "axios";
import React, { useEffect, useState } from "react";
import { Popover } from "antd";
import "./favorite.css";

const Favorites = () => {
  const [favoritedMovies, setFavoritedMovies] = useState([]);
  const user = JSON.parse(localStorage.getItem("profile"));

  const idUser = user?.result?._id;

  // const fetchApi = async () => {};
  const variables = { idUser };

  useEffect(() => {
    fetchFavoredMovie();
  }, []);

  const fetchFavoredMovie = () => {
    axios
      .post(
        "https://moviepop-1.herokuapp.com/favorites/getFavoredMovie",
        variables
      )
      .then((response) => {
        if (response.data.success) {
          setFavoritedMovies(response.data.favorites);
        } else {
          alert("Failed to get favorited videos");
        }
      });
  };

  const onClickRemove = (movieId) => {
    const variable = {
      movieId,
      idUser,
    };

    axios
      .post(
        "https://moviepop-1.herokuapp.com/favorites/removeFromFavorite",
        variable
      )
      .then((response) => {
        if (response.data.success) {
          fetchFavoredMovie();
        } else {
          alert("Failed to remove from Favorite");
        }
      });
  };

  const renderTableBody = favoritedMovies.map((movie, index) => {
    const content = (
      <div>
        {movie.movie.image ? (
          <img src={movie.movie.image.medium} alt={`${movie.movie.name}`} />
        ) : (
          "No Image"
        )}
      </div>
    );

    return (
      <tr key={index}>
        <Popover content={content} title={`${movie.movie.name}`}>
          <td>{movie.movie.name}</td>
        </Popover>
        <td>{movie.movie.averageRuntime}</td>
        <td>
          <button onClick={() => onClickRemove(movie.movieId)}>
            Remove from the Favorites
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <span className="pageTitle">Favorite Movies By Me</span>
      <div className="trending"></div>

      <table>
        <thead>
          <th>Movie Title</th>
          <th>Average</th>
          <td>Remove from favorites</td>
        </thead>
        <tbody>{renderTableBody}</tbody>
      </table>
    </div>
  );
};

export default Favorites;
