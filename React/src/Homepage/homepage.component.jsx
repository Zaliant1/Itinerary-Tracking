import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { HomepageCardList } from "../ItineraryCards/Homepage/homepageCardList.component";

export const Homepage = () => {
  const [publishedItineraryList, setPublishedItineraryList] = useState([]);

  useEffect(() => {
    fetch(`/itineraries`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        let publishedList = data.map((el) => {
          return el;
        });
        setPublishedItineraryList(publishedList);
      });
  }, []);

  return (
    <Container>
      <Row>
        <HomepageCardList homepageItems={publishedItineraryList} />
      </Row>
    </Container>
  );
};
