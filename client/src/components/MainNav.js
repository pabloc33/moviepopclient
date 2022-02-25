import React, { useEffect, useState } from "react";
import { useHistory, Link, useLocation } from "react-router-dom";
import { Avatar, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import usesStyles from "./styles";
import { useDispatch } from "react-redux";
import "./mainNav.css";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: "#2d313a",
    zIndex: 100,
  },
});

export default function SimpleBottomNavigation() {
  const classesS = usesStyles();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const history = useHistory();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: "LOGOUT" });

    history.push("/");
    setUser(null);
  };

  useEffect(() => {
    // const token = user?.token;

    // JWT...
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  useEffect(() => {
    if (value === 0) history.push("/");
    else if (value === 1) history.push("/search");
    else if (value === 2) history.push("/favorites");
    else if (value === 3) history.push("/auth");
  }, [value, history]);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        label="Home"
        icon={<FontAwesomeIcon icon={faHouseChimney} />}
      />
      <BottomNavigationAction
        label="Buscar"
        icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
      />
      <BottomNavigationAction
        label="Favoritos"
        icon={<FontAwesomeIcon icon={faStar} />}
      />
      {/* <Toolbar className={classesS.toolbar}> */}
      {user?.result ? (
        <div className="profile">
          {/* <Avatar
            className={classesS.purple}
            alt={user?.result.name}
            src={user?.result.imageUrl}
          >
            {user?.result.name.charAt(0)}
          </Avatar>
          <Typography className={classesS.userName} variant="h7">
            {user?.result.name}
          </Typography> */}
          <Button
            variant="contained"
            className={classesS.logout}
            color="secondary"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      ) : (
        <BottomNavigationAction
          component={Link}
          to="/auth"
          label="Sign In"
          icon={<FontAwesomeIcon icon={faRightToBracket} />}
        />
      )}
    </BottomNavigation>
  );
}
