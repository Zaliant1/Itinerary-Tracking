import React from "react";
import { ItineraryCard } from "./itineraryCard.component";

export const CardList = ({ itineraries }) => {
  return (
    <React.Fragment>
      {itineraries.map((itinerary) => (
        <ItineraryCard key={itinerary.id} itinerary={itinerary} />
      ))}
    </React.Fragment>
  );
};
