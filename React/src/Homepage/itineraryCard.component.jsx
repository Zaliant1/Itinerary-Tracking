import React, { useContext } from "react";
import { UserContext } from "../context/AuthProvider";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Divider,
  Grid,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import moment from "moment-timezone";

const TZ = moment.tz.guess();
const DISPLAY_FORMAT = "MMM Do YYYY [at] hh:mma z";

export const ItineraryCard = ({
  itinerary,
  refreshItineraries,
  setMessage,
}) => {
  const [user, setUser] = useContext(UserContext);

  const handleAddItineraryOnClick = () => {
    if (user) {
      fetch(`/itinerary/${itinerary.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: user.session_id,
        },
      }).then((res) => {
        res.json().then((data) => {
          fetch(`/itineraries/${user.id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: user.session_id,
            },
            body: JSON.stringify(data),
          }).then((postRes) => {
            if (postRes.status === 200) {
              setMessage("info", "Itinerary Added to Planner!");
              refreshItineraries();
            }
          });
        });
      });
    } else {
      setMessage("error", "Please login!");
    }
  };

  return (
    <Card variant="outlined" sx={{ mt: 2 }}>
      <CardContent>
        <Box>
          <Grid container spacing={8}>
            <Grid item md={10} sx={{ flexGrow: 1 }}>
              <Typography variant="h6">{itinerary.name}</Typography>
            </Grid>
            <Grid item md={2} sx={{ textAlign: "right" }}>
              <Typography variant="subtitle2" sx={{ lineHeight: 2.5 }}>
                {user && itinerary.user_id === user.id ? (
                  "(Added to Planner)"
                ) : (
                  <IconButton
                    color="primary"
                    onClick={handleAddItineraryOnClick}
                  >
                    <AddIcon />
                  </IconButton>
                )}
              </Typography>
            </Grid>
          </Grid>

          <Divider />
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle" sx={{ mr: 2 }}>
              Start Date:
            </Typography>
            <Typography variant="body">
              {moment(itinerary.start_datetime).tz(TZ).format(DISPLAY_FORMAT)}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle" sx={{ mr: 2 }}>
              End Date:
            </Typography>
            <Typography variant="body">
              {moment(itinerary.end_datetime).tz(TZ).format(DISPLAY_FORMAT)}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
