import React from "react";
import { ItineraryItemCard } from "./itineraryItemCard.component";

export const CardListItems = ({ itineraryItems }) => {
  return (
    <React.Fragment>
      {itineraryItems.map((itineraryItem) => (
        <ItineraryItemCard
          key={itineraryItem.id}
          itineraryItem={itineraryItem}
        />
      ))}
    </React.Fragment>
  );
};
