import React from "react";
import { Card, CardContent, Box, Typography, Divider } from "@mui/material";
import moment from "moment-timezone";

const TZ = moment.tz.guess();
const DISPLAY_FORMAT = "MMM Do YYYY [at] hh:mma z";
export const ItineraryItemCard = ({ item }) => {
  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Box>
          <Typography variant="h6">{item.description}</Typography>
          <Divider />
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle" sx={{ mr: 2 }}>
              Start Date:
            </Typography>
            <Typography variant="body">
              {moment(item.start_datetime).tz(TZ).format(DISPLAY_FORMAT)}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle" sx={{ mr: 2 }}>
              End Date:
            </Typography>
            <Typography variant="body">
              {moment(item.end_datetime).tz(TZ).format(DISPLAY_FORMAT)}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
