import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { ItineraryCard } from "./itineraryCard.component";
import { Alert } from "@mui/material";
export const Homepage = () => {
  const [message, setMessage] = useState({ type: null, text: null });
  const [publishedItineraryList, setPublishedItineraryList] = useState([]);

  const refreshItineraries = () => {
    fetch(`/itineraries`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        let publishedList = data.map((el) => {
          return el;
        });
        setPublishedItineraryList(publishedList);
      });
  };

  const sendAlert = (type, message) => {
    setMessage({ type: type, text: message });
  };

  useEffect(() => {
    refreshItineraries();
  }, []);

  return (
    <Container>
      {message.text ? (
        <Alert sx={{ mt: 2 }} severity={message.type}>
          {message.text}
        </Alert>
      ) : null}
      {publishedItineraryList.map((data) => (
        <ItineraryCard
          key={data.id}
          itinerary={data}
          refreshItineraries={refreshItineraries}
          setMessage={sendAlert}
        />
      ))}
    </Container>
  );
};
