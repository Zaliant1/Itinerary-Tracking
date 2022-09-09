import React, { useContext, useState } from "react";

import { UserContext } from "../context/AuthProvider";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Divider,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";

import moment from "moment-timezone";
const DEFAULT_ITEM_STATE = {
  description: "",
  start_datetime: "",
  end_datetime: "",
};
const TZ = moment.tz.guess();

export const AddItineraryForm = ({
  refreshItineraries,
  open,
  handleToggle,
}) => {
  const [itinerary, setItinerary] = useState({
    items: [],
    start_datetime: "",
    end_datetime: "",
    name: "",
    is_published: false,
  });
  const [item, setItem] = useState(DEFAULT_ITEM_STATE);
  const [user, setUser] = useContext(UserContext);

  const handleItineraryChange = (e, isDatetime) => {
    const newState = { ...itinerary };

    if (isDatetime) {
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

  const handleSubmit = () => {
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

        refreshItineraries();
        handleToggle(!open);
      }
    });
  };

  return (
    <Dialog fullWidth={true} open={open} onClose={() => handleToggle(!open)}>
      <DialogContent>
        <Container>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            Add Itinerary
          </Typography>
          <Grid container sx={{ mb: 2 }} columns={{ md: 12 }}>
            <Grid item md={12}>
              <TextField
                id="name"
                color="primary"
                label="Name"
                variant="standard"
                fullWidth={true}
                onChange={(e) => handleItineraryChange(e)}
                value={itinerary.name}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2 }} columns={{ md: 12 }}>
            <Grid item md={6}>
              <TextField
                id="start_datetime"
                color="primary"
                label="Start Date"
                variant="standard"
                fullWidth={true}
                sx={{ mr: 2 }}
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => handleItineraryChange(e, true)}
                value={
                  itinerary.start_datetime
                    ? moment
                        .utc(itinerary.start_datetime)
                        .tz(TZ)
                        .format("YYYY-MM-DD[T]HH:mm")
                    : itinerary.end_datetime
                }
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                id="end_datetime"
                color="primary"
                label="End Date"
                variant="standard"
                fullWidth={true}
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => handleItineraryChange(e, true)}
                value={
                  itinerary.end_datetime
                    ? moment
                        .utc(itinerary.end_datetime)
                        .tz(TZ)
                        .format("YYYY-MM-DD[T]HH:mm")
                    : itinerary.end_datetime
                }
              />
            </Grid>
          </Grid>

          <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
            Itinerary Items
          </Typography>
          <pre>{JSON.stringify(itinerary.items, null, 2)}</pre>
          <Divider />
          <Grid container sx={{ mb: 2 }} columns={{ md: 12 }}>
            <Grid item md={12}>
              <TextField
                id="description"
                color="primary"
                label="Description"
                variant="standard"
                fullWidth={true}
                onChange={(e) => handleItineraryItemChange(e)}
                value={item.description}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2 }} columns={{ md: 12 }}>
            <Grid item md={6}>
              <TextField
                id="start_datetime"
                color="primary"
                label="Start Date"
                variant="standard"
                fullWidth={true}
                sx={{ mr: 2 }}
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => handleItineraryItemChange(e, true)}
                value={
                  item.start_datetime
                    ? moment
                        .utc(item.start_datetime)
                        .tz(TZ)
                        .format("YYYY-MM-DD[T]HH:mm")
                    : item.start_datetime
                }
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                id="end_datetime"
                color="primary"
                label="End Date"
                variant="standard"
                fullWidth={true}
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => handleItineraryItemChange(e, true)}
                value={
                  item.end_datetime
                    ? moment
                        .utc(item.end_datetime)
                        .tz(TZ)
                        .format("YYYY-MM-DD[T]HH:mm")
                    : item.end_datetime
                }
              />
            </Grid>
          </Grid>
          <Button variant="outlined" onClick={() => addNewItineraryItem()}>
            Add Item
          </Button>
        </Container>
        <DialogActions>
          <Button onClick={() => handleSubmit()}>Submit</Button>
          <Button onClick={() => handleToggle(!open)}>Close</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
