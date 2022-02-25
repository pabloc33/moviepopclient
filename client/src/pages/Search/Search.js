import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import {
  createTheme,
  TextField,
  ThemeProvider,
  Button,
} from "@material-ui/core";
import SingleContent from "../../components/SingleContent/SingleContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./search.css";

const Search = () => {
  const [content, setContent] = useState([]);
  const [searchText, setSearchText] = useState("");

  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const fetchApi = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `http://api.tvmaze.com/search/shows?q=${
          searchText ? searchText : "star%20wars"
        }`
      );
      // console.log(data);
      setContent(data);
    } catch (error) {
      console.log(error);
    }
  }, [searchText]);

  // const fetchApi = async () => {};

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div style={{ display: "flex", margin: "15px 0" }}>
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            variant="contained"
            style={{ marginLeft: 10 }}
            onClick={fetchApi}
          >
            {" "}
            <FontAwesomeIcon icon={faMagnifyingGlass} />{" "}
          </Button>
        </div>
      </ThemeProvider>

      <span className="pageTitle">Search</span>
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.show.id}
              id={c.show.id}
              poster={c.show.image?.medium}
              title={c.show.name}
              date={c.show.premiered}
              type={c.show.type}
              avarege={c.show.averageRuntime}
            />
          ))}
        {searchText && !content ? <h2>No Movies Found</h2> : null}
      </div>
    </div>
  );
};

export default Search;
