import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { TResult } from "../types/types";

function Character(props: TResult<string>): JSX.Element {
  const { name, status, image, location, species, origin } = props;
  return (
    <>
      <Card style={styles.card}>
        <Box style={{ display: "flex", flexDirection: "column" }}>
          <CardContent style={styles.cardContent}>
            <Typography component="div" variant="h5">
              {name}
            </Typography>

            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              <span
                style={{
                  color: `${status === "Alive" ? "green" : "red"}`,
                }}
              >
                ●
              </span>
              {`${status}-${species}`}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {`Last known location: 
              ${location}`}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {`Origin: 
              ${origin}`}
            </Typography>
          </CardContent>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={`${image}`}
          alt="Live from space album cover"
        />
      </Card>
    </>
  );
}

const styles = {
  card: {
    display: "flex",
    width: 400,
    margin: "1%",
  },
  cardBox: {
    display: "flex",
    flexDirection: "column",
  },
  cardContent: {
    flex: "1 0 auto",
  },
};

export default Character;
