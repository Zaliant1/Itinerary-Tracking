import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/AuthProvider";
import { ItineraryItemCard } from "./itineraryItemCard.component";
import { Box, Typography, Container } from "@mui/material";
import moment from "moment-timezone";

const TZ = moment.tz.guess();
const DISPLAY_FORMAT = "MMM Do YYYY [at] hh:mma z";

export const Itinerary = () => {
  let { itinerary_id } = useParams();
  const [itinerary, setItinerary] = useState({ items: [] });
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    if (user) {
      fetch(`/itinerary/${itinerary_id}`, {
        method: "GET",
        headers: {
          authorization: user.session_id,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setItinerary(data);
        });
    }
  }, [user]);

  return (
    <Container sx={{ mt: 2 }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4">{itinerary.name}</Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle" sx={{ mr: 2 }}>
            Start Date:
          </Typography>
          <Typography variant="body">
            {moment(itinerary.start_datetime).tz(TZ).format(DISPLAY_FORMAT)}
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle" sx={{ mr: 2 }}>
            End Date:
          </Typography>
          <Typography variant="body">
            {moment(itinerary.end_datetime).tz(TZ).format(DISPLAY_FORMAT)}
          </Typography>
        </Box>
      </Box>
      {itinerary.items.map((itineraryItem) => (
        <ItineraryItemCard key={itineraryItem.id} item={itineraryItem} />
      ))}
    </Container>
  );
};
