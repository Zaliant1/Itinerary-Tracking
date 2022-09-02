import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { UserContext } from "../context/AuthProvider";
import "./itineraries.component.css";

const Itineraries = () => {
  const [user, setUser] = useContext(UserContext);

  const [itineraryImg, setItineraryImg] = useState();
  const [itineraryTitle, setItineraryTitle] = useState();
  const [itineraryStart, setItineraryStart] = useState();
  const [itineraryEnd, setItineraryEnd] = useState();
  const [itineraryCreate, setItineraryCreate] = useState();
  const [itineraryUpdate, setItineraryUpdate] = useState();

  useEffect(() => {
    fetch(`/itineraries/${user.id}`, {
      headers: {
        authorization: user.session_id,
      },
    }).then((data) => {
      data.json().then((res) => {
        console.log(res);
      });
    });
  });

  const handleSubmit = () => {};

  return (
    <div>
      <p>
        <p>login info</p>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </p>
      <button onClick={() => handleSubmit()}>Create Itinerary</button>
      <Card style={{ width: "18rem", outline: "2px solid black" }}>
        <Card.Img variant="top" src={itineraryImg} />
        <Card.Body>
          <Card.Title>{itineraryTitle}</Card.Title>
          <Card.Text>
            start date: {itineraryStart}, end date: {itineraryEnd}
          </Card.Text>
          <Card.Text>
            created at: {itineraryCreate}, updated at: {itineraryUpdate}
          </Card.Text>

          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Itineraries;
