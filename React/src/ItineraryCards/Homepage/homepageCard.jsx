import React, { useContext } from "react";
import { UserContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

import { Card, Col } from "react-bootstrap";

export const HomepageCard = ({ homepageItem }) => {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  const handleRedirectOnClick = (e) => {
    navigate("/login");
  };

  const AddButton = () => {
    if (user.id === homepageItem.user_id) {
      return null;
    } else if (user) {
      return <button>Add to your itinerary</button>;
    } else if (!user) {
      return (
        <button
          onClick={(e) => {
            handleRedirectOnClick(e);
          }}
        >
          Log in to add to your itinerary
        </button>
      );
    }
  };

  return (
    <React.Fragment>
      <Col
        key={`card-${homepageItem.name}`}
        md="4"
        style={{ marginBottom: "15px", marginTop: "15px" }}
      >
        <Card
          id={`card-${homepageItem.user_id}`}
          style={{
            backgroundColor:
              user.id === homepageItem.user_id ? "#a5e8aa" : "white",
            borderRadius: "5px",
            width: "550px",
            margin: "20px auto",
            padding: "20px",
          }}
        >
          <Card.Body>
            <p>Itinerary Name : {homepageItem.name}</p>
            <p>
              Dates : {homepageItem.start_datetime} -{" "}
              {homepageItem.end_datetime}
            </p>

            <AddButton />
          </Card.Body>
        </Card>
      </Col>
    </React.Fragment>
  );
};
