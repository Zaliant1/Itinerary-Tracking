import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/AuthProvider";
import { CardListItems } from "../ItineraryCards/ItineraryItems/intineraryItemsCardList.component";

import "./itinerary.styles.css";

export const Itinerary = () => {
  let { itinerary_id } = useParams();
  const [itineraryInfo, setItineraryInfo] = useState({ items: [] });
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
          setItineraryInfo(data);
        });
    }
  }, [user]);

  return (
    <div className="container">
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <pre>{JSON.stringify(itineraryInfo, null, 2)}</pre>
      <CardListItems itineraryItems={itineraryInfo.items} />
    </div>
  );
};
