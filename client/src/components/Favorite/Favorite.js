import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./favorite.css";

const Favorite = ({ idUser, movieId, movie }) => {
  const [favoriteNumber, setfavoriteNumber] = useState(0);
  const [favorited, setFavorited] = useState(false);

  const variable = {
    idUser,
    movieId,
    movie,
  };

  useEffect(() => {
    axios
      .post(
        "https://moviepop-1.herokuapp.com/favorites/favoriteNumber",
        variable
      )
      .then((response) => {
        if (response.data.success) {
          setfavoriteNumber(response.data.favoriteNumber);
        } else {
          alert("Failed to get favoriteNumber");
        }
      });

    axios
      .post("https://moviepop-1.herokuapp.com/favorites/favorited", variable)
      .then((response) => {
        if (response.data.success) {
          setFavorited(response.data.favorited);
        } else {
          alert("Failed to get favorite Info");
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickFavorite = () => {
    if (favorited) {
      axios
        .post(
          "https://moviepop-1.herokuapp.com/favorites/removeFromFavorite",
          variable
        )
        .then((response) => {
          if (response.data.success) {
            setfavoriteNumber(favoriteNumber - 1);
            setFavorited(!favorited);
          } else {
            alert("Failed to remove from Favorite");
          }
        });
    } else {
      axios
        .post(
          "https://moviepop-1.herokuapp.com/favorites/addToFavorite",
          variable
        )
        .then((response) => {
          if (response.data.success) {
            setfavoriteNumber(favoriteNumber + 1);
            setFavorited(!favorited);
          } else {
            alert("Failed to add to Favorites");
          }
        });
    }
  };

  return (
    <div className="ContentModal__about">
      <Button
        variant="contained"
        startIcon={<FontAwesomeIcon icon={faStar} />}
        color="secondary"
        target="__blank"
        onClick={onClickFavorite}
      >
        {favorited ? "remove from Favorite" : "Add to favorite"}
        {favoriteNumber}
      </Button>
    </div>
  );
};

export default Favorite;
