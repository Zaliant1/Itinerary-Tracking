import React, { useContext, useEffect, useState } from "react";

import { UserContext } from "../context/AuthProvider";
import { Box, Typography, Grid, IconButton, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

import { AddItineraryForm } from "./addItinerary.component";
import { ItineraryCard } from "./itineraryCard.component";

const Itineraries = () => {
  const navigate = useNavigate();
  const [itineraries, setItineraries] = useState([]);
  const [user, setUser] = useContext(UserContext);
  const [toggleAdd, setAddToggle] = useState(false);

  const fetchItineraries = () => {
    fetch(`/itineraries/${user.id}`, {
      method: "GET",
      headers: {
        authorization: user.session_id,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let itinList = data.map((el) => {
          return el;
        });
        setItineraries(itinList);
      });
  };

  useEffect(() => {
    if (user) {
      fetchItineraries();
    }
    if (!user) {
      navigate("/");
    }
  }, []);

  return (
    <Container>
      <AddItineraryForm
        refreshItineraries={fetchItineraries}
        open={toggleAdd}
        handleToggle={setAddToggle}
      />

      <Box sx={{ mt: 2 }}>
        <Grid container spacing={8}>
          <Grid item md={10} sx={{ flexGrow: 1 }}>
            <Typography variant="h5">Your Planner</Typography>
          </Grid>
          <Grid item md={2} sx={{ textAlign: "right" }}>
            <IconButton
              color="primary"
              onClick={() => setAddToggle(!toggleAdd)}
            >
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
      {itineraries.map((itinerary) => (
        <ItineraryCard
          key={itinerary.id}
          itinerary={itinerary}
          refreshItineraries={fetchItineraries}
        />
      ))}
    </Container>
  );
};

export default Itineraries;
