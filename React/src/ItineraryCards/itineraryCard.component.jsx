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
        <Card>
          <Card.Body>
            <Link to={`/itinerary/${itinerary.id}`}>
              <p>{itinerary.name}</p>
              <p>
                {itinerary.start_datetime} - {itinerary.end_datetime}
              </p>
            </Link>
          </Card.Body>
        </Card>
      </Col>
    </React.Fragment>
  );
};
