import React, { useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import "./contentModal.css";
import Favorite from "../Favorite/Favorite";
import { unavailableLandscape } from "../../config/config";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));

export default function ContentModal({ children, id }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = useState();
  const user = JSON.parse(localStorage.getItem("profile"));

  const idUser = user?.result?._id;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get(`http://api.tvmaze.com/shows/${id}`);
      //console.log(data);
      setContent(data);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  // const fetchData = async () => {};

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <div type="button" className="media" onClick={handleOpen}>
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {content && (
            <>
              <div className={classes.paper}>
                <div className="ContentModal">
                  <img
                    className="ContentModal__portrait"
                    src={
                      content.image?.medium
                        ? content.image?.medium
                        : unavailableLandscape
                    }
                    alt={content.name}
                  />
                  <div className="ContentModal__about">
                    <span className="ContentModal__title">
                      {content.name} {content.premiered}
                    </span>
                    <span className="ContentModal__description">
                      {content.summary}
                    </span>
                    <div></div>
                    <Favorite
                      idUser={idUser}
                      movieId={content.id}
                      movie={content}
                    />
                    {/* <Button
                      variant="contained"
                      startIcon={<FontAwesomeIcon icon={faStar} />}
                      color="secondary"
                      target="__blank"
                      //href={`https://www.youtube.com/watch?v=${video}`}
                    >
                      Add to Favorite
                    </Button> */}
                  </div>
                </div>
              </div>
            </>
          )}
        </Fade>
      </Modal>
    </div>
  );
}
