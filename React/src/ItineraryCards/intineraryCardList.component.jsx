import React from "react";
import { ItineraryCard } from "./itineraryCard.component";

export const CardList = ({ itineraries }) => {
  console.log(itineraries);
  return (
    <React.Fragment>
      {itineraries.map((itinerary) => (
        <ItineraryCard itinerary={itinerary} />
      ))}
    </React.Fragment>
  );
};
