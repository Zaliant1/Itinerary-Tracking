import React, { useContext, useEffect, useState } from "react";
import { CardList } from "../ItineraryCards/Itineraries/intineraryCardList.component";
import moment from "moment-timezone";
import { useNavigate } from "react-router-dom";

import { Container, Row } from "react-bootstrap";
import { UserContext } from "../context/AuthProvider";
import "./itineraries.styles.css";

const DEFAULT_ITEM_STATE = {
  description: "",
  start_datetime: "",
  end_datetime: "",
};
const TZ = moment.tz.guess();

const Itineraries = () => {
  const navigate = useNavigate();
  const [itineraryList, setItineraryList] = useState([]);
  const [itinerary, setItinerary] = useState({
    items: [],
    start_datetime: "",
    end_datetime: "",
    name: "",
    is_published: false,
  });
  const [item, setItem] = useState(DEFAULT_ITEM_STATE);
  const [user, setUser] = useContext(UserContext);

  const fetchItineraries = () => {
    if (user) {
      fetch(`/itineraries/${user.id}`, {
        method: "GET",
        headers: {
          authorization: user.session_id,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          let itinList = data.map((el) => {
            return el;
          });
          setItineraryList(itinList);
        });
    }
  };

  useEffect(() => {
    if (user) {
      fetchItineraries();
    }
    if (!user) {
      navigate("/");
    }
  }, []);

  const handleItineraryChange = (e, isDatetime, isCheckbox) => {
    const newState = { ...itinerary };

    if (isCheckbox && e.target.checked) {
      newState[e.target.id] = true;
    } else if (isCheckbox && !e.target.checked) {
      newState[e.target.id] = false;
    } else if (isDatetime) {
      newState[e.target.id] = moment
        .tz(moment(e.target.value, "YYYY-MM-DD[T]HH:mm"), TZ)
        .utc()
        .format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
    } else {
      newState[e.target.id] = e.target.value;
    }

    setItinerary(newState);
  };

  const handleItineraryItemChange = (e, isDatetime) => {
    const newState = { ...item };

    if (isDatetime) {
      newState[e.target.id] = moment
        .tz(moment(e.target.value, "YYYY-MM-DD[T]HH:mm"), TZ)
        .utc()
        .format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
    } else {
      newState[e.target.id] = e.target.value;
    }
    setItem(newState);
  };

  const addNewItineraryItem = () => {
    const newItinerary = { ...itinerary };
    newItinerary.items.push(item);
    setItinerary(newItinerary);
    setItem(DEFAULT_ITEM_STATE);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/itineraries/${user.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itinerary),
    }).then((res) => {
      if (res.status === 200) {
        setItinerary({
          items: [],
          start_datetime: "",
          end_datetime: "",
          name: "",
          is_published: false,
        });
        fetchItineraries();
      } else if (res.status === 500) {
        res.json().then((data) => {});
      }
    });
  };

  return (
    <div>
      <p>login info</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <div className="form">
        <div className="form-body">
          <pre>{JSON.stringify(itinerary, null, 2)}</pre>
          <div className="itinerary-name">
            <label className="form__label">Itinerary Name </label>
            <input
              id="name"
              className="form__input"
              placeholder="Name"
              value={itinerary.name}
              onChange={(e) => handleItineraryChange(e)}
            />
          </div>
          <div className="itinerary-start">
            <label className="form__label">Itinerary Start Date </label>
            <input
              type="datetime-local"
              id="start_datetime"
              className="form__input"
              value={
                itinerary.start_datetime
                  ? moment
                      .utc(itinerary.start_datetime)
                      .tz(TZ)
                      .format("YYYY-MM-DD[T]HH:mm")
                  : itinerary.start_datetime
              }
              onChange={(e) => handleItineraryChange(e, true)}
            />
          </div>
          <div className="itinerary-end">
            <label className="form__label">Itinerary End Date </label>
            <input
              type="datetime-local"
              id="end_datetime"
              className="form__input"
              value={
                itinerary.end_datetime
                  ? moment
                      .utc(itinerary.end_datetime)
                      .tz(TZ)
                      .format("YYYY-MM-DD[T]HH:mm")
                  : itinerary.end_datetime
              }
              onChange={(e) => handleItineraryChange(e, true)}
            />
          </div>
        </div>

        <div className="form-body">
          <div className="itinerary-item-description">
            <label className="form__label">Itinerary Item Description </label>
            <input
              id="description"
              className="form__input"
              placeholder="Description"
              value={item.description}
              onChange={(e) => handleItineraryItemChange(e)}
            />
          </div>
          <div className="itinerary-item-start">
            <label className="form__label">Itinerary Item Start </label>
            <input
              type="datetime-local"
              id="start_datetime"
              className="form__input"
              value={
                item.start_datetime
                  ? moment
                      .utc(item.start_datetime)
                      .tz(TZ)
                      .format("YYYY-MM-DD[T]HH:mm")
                  : item.start_datetime
              }
              onChange={(e) => handleItineraryItemChange(e, true)}
            />
          </div>
          <div className="itinerary-item-end">
            <label className="form__label">Itinerary Item End </label>
            <input
              type="datetime-local"
              id="end_datetime"
              className="form__input"
              value={
                item.end_datetime
                  ? moment
                      .utc(item.end_datetime)
                      .tz(TZ)
                      .format("YYYY-MM-DD[T]HH:mm")
                  : item.end_datetime
              }
              onChange={(e) => handleItineraryItemChange(e, true)}
            />
          </div>
        </div>

        <div className="footer">
          <div>
            <label htmlFor="is_published">Publicize Your Itinerary? : </label>

            <input
              type="checkbox"
              id="is_published"
              value={itinerary.is_published}
              onChange={(e) => handleItineraryChange(e, false, true)}
            />
          </div>

          <button
            type="submit"
            className="btn"
            onClick={(e) => handleSubmit(e)}
          >
            Submit Itinerary
          </button>
          <button
            type="submit"
            className="btn"
            onClick={(e) => addNewItineraryItem()}
          >
            Add Itinerary Item
          </button>
        </div>
      </div>
      <Container>
        <Row>
          <h2>your list</h2>
          <CardList itineraries={itineraryList} />
        </Row>
      </Container>
    </div>
  );
};

export default Itineraries;
