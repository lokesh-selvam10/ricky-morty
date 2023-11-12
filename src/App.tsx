import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import Character from "./components/Character";
import {
  Button,
  Grid,
  Pagination,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import Select from "./components/Select";
import fetchCharacters from "./api/FetchCharacters";
import { TResult, TRequest } from "./types/types";

type TName = {
  name: string;
};

function App() {
  const [input, setInput] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);
  const [characters, setCharacters] = useState<TResult<TName>[] | null>();
  const [duplicateCharacters, setDuplicateCharacters] = useState<
    TResult<TName>[] | null
  >();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [status, setStatus] = useState<string>("");
  const [Error, setError] = useState<string>("");

  const statusType = ["Alive", "Dead"];

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
      setDisabled(false);
    },
    []
  );

  const handleSearch = useCallback(() => {
    if (!input) {
      setCharacters(duplicateCharacters);
      return;
    }

    const searchResult = characters?.filter(
      (e) => e.name.toLocaleLowerCase() === input.toLocaleLowerCase()
    );
    setCharacters(searchResult);
    setDisabled(false);
  }, [duplicateCharacters, input, characters]);

  const handleStatus = useCallback(
    (e: SelectChangeEvent) => {
      if (!e.target.value) {
        setStatus(e.target.value);
        setCharacters(duplicateCharacters);
        return;
      }

      const searchResult = duplicateCharacters?.filter(
        (character) => character.status === e.target.value
      );
      setStatus(e.target.value);
      setCharacters(searchResult);
      setInput("");
    },
    [duplicateCharacters]
  );

  const handlePagination = useCallback(
    (e: React.ChangeEvent<unknown>, page: number) => {
      setPageNumber(page);
    },
    []
  );

  const handleReset = useCallback(() => {
    setCharacters(duplicateCharacters);
    setInput("");
    setStatus("");
  }, [duplicateCharacters]);

  useEffect(() => {
    const url = "https://rickandmortyapi.com/api/character";
    fetchCharacters<TRequest>(url, "GET", pageNumber).then((response) => {
      if ("error" in response) {
        return setError(response.error);
      } else {
        setCharacters(response.results);
        setDuplicateCharacters(response.results);
      }
    });
  }, [pageNumber]);

  return (
    <Grid container direction="column" style={styles.container}>
      <Grid item style={styles.item} display="flex">
        <Grid item>
          <TextField
            style={styles.input}
            label="Search by name"
            variant="outlined"
            value={input}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item style={styles.button}>
          <Button disabled={disabled} onClick={handleSearch}>
            Search
          </Button>
        </Grid>
      </Grid>
      <Button
        style={{ position: "absolute", right: 0, top: 0 }}
        onClick={handleReset}
      >
        Reset
      </Button>
      <Grid item style={styles.item}>
        <Select
          handleChange={handleStatus}
          value={status}
          statusType={statusType}
        />
      </Grid>
      {!Error ? (
        <Grid container item direction="row" alignContent="center">
          {characters?.length ? (
            characters.map(
              ({ name, status, image, location, species, origin }, index) => (
                <Character
                  key={index}
                  name={name}
                  status={status}
                  image={image}
                  location={location.name}
                  species={species}
                  origin={origin.name}
                />
              )
            )
          ) : (
            <h1>No Results found</h1>
          )}
        </Grid>
      ) : (
        <>{Error}</>
      )}
      <Grid item style={styles.pagination}>
        {characters?.length ? (
          <Pagination count={10} onChange={handlePagination}></Pagination>
        ) : null}
      </Grid>
    </Grid>
  );
}
const styles = {
  container: {
    margin: "2%",
  },
  item: {
    marginLeft: "1%",
  },
  button: {
    marginLeft: "2%",
  },
  pagination: {
    marginLeft: "40%",
  },
  input: {
    width: 300,
  },
};

export default App;
