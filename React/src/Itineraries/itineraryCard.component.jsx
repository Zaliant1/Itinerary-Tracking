import React, { useContext, useState } from "react";
import { UserContext } from "../context/AuthProvider";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Divider,
  Grid,
  Button,
  Link,
} from "@mui/material";
import moment from "moment-timezone";
import { useNavigate } from "react-router-dom";

const TZ = moment.tz.guess();
const DISPLAY_FORMAT = "MMM Do YYYY [at] hh:mma z";

export const ItineraryCard = ({
  itinerary,
  refreshItineraries,
  setMessage,
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);
  const [internalItinerary, setItinerary] = useState(itinerary);

  const handleDelete = () => {
    fetch(`/itinerary/${internalItinerary.id}`, {
      method: "DELETE",
      headers: {
        authorization: user.session_id,
      },
    }).then((res) => {
      if (res.status === 200) {
        refreshItineraries();
      }
    });
  };

  const handlePublishUpdate = (e) => {
    fetch(`/itinerary/${internalItinerary.id}/publish`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: user.session_id,
      },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setItinerary({ ...itinerary, is_published: data.is_published });
        });
      }
    });
  };

  return (
    <Card variant="outlined" sx={{ mt: 2 }}>
      <CardContent>
        <Grid container spacing={8}>
          <Grid item md={9} sx={{ flexGrow: 1 }}>
            <Link
              onClick={() => navigate(`/itinerary/${internalItinerary.id}`)}
              style={{ cursor: "pointer" }}
            >
              <Typography variant="h6">{internalItinerary.name}</Typography>
            </Link>
          </Grid>
          <Grid item md={3} sx={{ textAlign: "right" }}>
            {internalItinerary.is_published ? (
              <Button
                variant="contained"
                color="error"
                size="small"
                sx={{ mr: 1 }}
                onClick={handlePublishUpdate}
              >
                Unpublish
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                size="small"
                sx={{ mr: 1 }}
                onClick={handlePublishUpdate}
              >
                Publish
              </Button>
            )}
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 2 }} />
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle" sx={{ mr: 2 }}>
            Start Date:
          </Typography>
          <Typography variant="body">
            {moment(internalItinerary.start_datetime)
              .tz(TZ)
              .format(DISPLAY_FORMAT)}
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle" sx={{ mr: 2 }}>
            End Date:
          </Typography>
          <Typography variant="body">
            {moment(internalItinerary.end_datetime)
              .tz(TZ)
              .format(DISPLAY_FORMAT)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
