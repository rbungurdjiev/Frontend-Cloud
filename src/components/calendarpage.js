import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DatePicker from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookedSlot, setBookedSlot] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Generate time slots from 07:00 to 23:00
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 7; hour < 23; hour++) {
      slots.push(`${hour}:00`);
      slots.push(`${hour}:30`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleSlotClick = (slot) => {
    if (bookedSlot && bookedSlot.date === selectedDate.toDateString()) {
      alert("You already have a booking. Please cancel it before booking a new slot.");
      return;
    }
    setSelectedSlot(slot);
    setConfirmDialog(true);
  };

  const handleConfirmBooking = () => {
    setBookedSlot({ date: selectedDate.toDateString(), time: selectedSlot });
    setConfirmDialog(false);
  };

  const handleCancelBooking = () => {
    setBookedSlot(null);
    alert("Your booking has been canceled.");
  };

  const isSlotBooked = (slot) => {
    return bookedSlot && bookedSlot.date === selectedDate.toDateString() && bookedSlot.time === slot;
  };

  const formatSelectedDay = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = days[selectedDate.getDay()];
    return `${dayName}, ${selectedDate.toDateString()}`;
  };

  // Disable weekends
  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // Disable Sundays (0) and Saturdays (6)
  };

  return (
       <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "100px",
        marginTop: "20px",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Select a Date & Time
      </Typography>

      {/* Calendar */}
      <Box mb={3}>
        <DatePicker
          onChange={setSelectedDate}
          value={selectedDate}
          tileDisabled={({ date }) => isWeekend(date)} // Disable weekends
          minDate={new Date()}
        />
      </Box>

      {/* Selected Day Display */}
      <Typography variant="h6" sx={{ mb: 3 }}>
        Selected Day: {formatSelectedDay()}
      </Typography>

      {/* Time Slots */}
      <Grid container spacing={2}>
        {timeSlots.map((slot) => (
          <Grid item xs={6} sm={3} key={slot}>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                bgcolor: isSlotBooked(slot) ? "error.main" : "white",
                color: isSlotBooked(slot) ? "white" : "text.primary",
                border: isSlotBooked(slot) ? "1px solid #e53e3e" : "1px solid #ccc",
                textTransform: "none",
                py: 1.5,
                fontWeight: isSlotBooked(slot) ? "bold" : "normal",
              }}
              disabled={isSlotBooked(slot)}
              onClick={() => handleSlotClick(slot)}
            >
              {slot}
            </Button>
          </Grid>
        ))}
      </Grid>

      {/* Current Booking */}
      {bookedSlot && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="body1" mb={2}>
            You have booked: {bookedSlot.date} at {bookedSlot.time}
          </Typography>
          <Button variant="contained" color="secondary" onClick={handleCancelBooking}>
            Cancel Booking
          </Button>
        </Box>
      )}

      {/* Confirm Booking Dialog */}
      <Dialog open={confirmDialog} onClose={() => setConfirmDialog(false)}>
        <DialogTitle>Confirm Booking</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to book {formatSelectedDay()} at {selectedSlot}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmBooking} color="primary" variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CalendarPage;