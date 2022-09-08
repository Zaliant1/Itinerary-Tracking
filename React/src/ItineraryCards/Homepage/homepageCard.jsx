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

  const handleAddItineraryOnClick = (e) => {
    e.preventDefault();
    fetch(`/itineraries/${user.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(homepageItem),
    }).then((res) => {
      if (res.status === 200) {
        window.location.reload();
        alert("itinerary added");
      }
    });
  };

  const AddButton = () => {
    if (!user) {
      return (
        <button
          onClick={(e) => {
            handleRedirectOnClick(e);
          }}
        >
          Log in to add to your itinerary
        </button>
      );
    } else if (user && user.id === homepageItem.user_id) {
      return null;
    } else if (user) {
      return (
        <button
          onClick={(e) => {
            handleAddItineraryOnClick(e);
          }}
        >
          Add to your itinerary
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
              user && user.id === homepageItem.user_id ? "#a5e8aa" : "white",
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
