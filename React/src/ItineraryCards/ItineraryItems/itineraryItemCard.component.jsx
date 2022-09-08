import React from "react";

import { Card, Col } from "react-bootstrap";

export const ItineraryItemCard = ({ itineraryItem }) => {
  return (
    <React.Fragment>
      <Col
        key={`card-${itineraryItem.name}`}
        md="4"
        style={{ marginBottom: "15px", marginTop: "15px" }}
      >
        <Card
          style={{
            backgroundColor: "white",
            borderRadius: "5px",
            width: "550px",
            margin: "20px auto",
            padding: "20px",
          }}
        >
          <Card.Body>
            <p>Itinerary Item Description : {itineraryItem.description}</p>
            <p>
              Dates : {itineraryItem.start_datetime} -{" "}
              {itineraryItem.end_datetime}
            </p>
          </Card.Body>
        </Card>
      </Col>
    </React.Fragment>
  );
};
