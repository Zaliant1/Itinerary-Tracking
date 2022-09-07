import React from "react";

import { Card, Col } from "react-bootstrap";

// import { Button, Alert, Breadcrumb, Card, Form, Jumbotron} from "react-bootstrap"

export const ItineraryCard = ({ itinerary }) => {
  return (
    <React.Fragment>
      <Col
        key={`card-${"asdfasdf"}`}
        md="4"
        style={{ marginBottom: "15px", marginTop: "15px" }}
      >
        <Card>
          <Card.Body>
            <p>{itinerary.name}</p>
          </Card.Body>
        </Card>
      </Col>
    </React.Fragment>
  );
};
