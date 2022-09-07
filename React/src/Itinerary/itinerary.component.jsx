import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./itinerary.styles.css";

export const Itinerary = () => {
  let { itinerary_id } = useParams();
  const [itineraryInfo, setItineraryInfo] = useState({});

  useEffect(() => {
    fetch(`/itinerary/${itinerary_id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("this is the data log", data);
        setItineraryInfo(data);
        console.log("this is the itinerary info", itineraryInfo);
      });
  }, []);

  return (
    <div>
      <h1>{itineraryInfo.name}</h1>
      <span>start {itineraryInfo.start_datetime}</span>
      <br />
      <span>end {itineraryInfo.end_datetime}</span>
    </div>
  );
};
