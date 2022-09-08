import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { Card, Col } from "react-bootstrap";
import { UserContext } from "../../context/AuthProvider";

export const ItineraryCard = ({ itinerary }) => {
  const [user, setUser] = useContext(UserContext);

  const handleDelete = (e) => {
    if (user) {
      e.preventDefault();

      fetch(`/deleteitinerary/${itinerary.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itinerary),
      }).then((res) => {
        if (res.status === 200) {
          console.log(res);
          alert("itinerary deleted!");
          window.location.reload();
        }
      });
    } else {
      alert("error deleting itinerary, please log in again");
    }
  };

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
            <button
              type="submit"
              className="btn"
              onClick={(e) => handleDelete(e)}
            >
              Delete Itinerary
            </button>
          </Card.Body>
        </Card>
      </Col>
    </React.Fragment>
  );
};
