import React from "react";
import { Link } from "react-router-dom";

import { Card, Col } from "react-bootstrap";

export const ItineraryCard = ({ itinerary }) => {
  return (
    <React.Fragment>
      <Col
        key={`card-${itinerary.name}`}
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
            <Link to={`/itinerary/${itinerary.id}`}>
              <p>User : {itinerary.user_id}</p>
              <p>Itinerary : {itinerary.name}</p>
              <p>
                Dates : {itinerary.start_datetime} - {itinerary.end_datetime}
              </p>
            </Link>
          </Card.Body>
        </Card>
      </Col>
    </React.Fragment>
  );
};
