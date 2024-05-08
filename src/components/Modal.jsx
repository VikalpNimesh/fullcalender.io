import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Modal.css";
import moment from "moment";
const Modal = ({ setShowModal, setEvents, SelectInfos, events }) => {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [occupiedSlots, setOccupiedSlots] = useState([]);
  // console.log(events);

  // console.log(occupiedSlots);
  useEffect(() => {
    // console.log(SelectInfos.startStr);
    const eventDate = new Date(SelectInfos.startStr);
    // console.log(eventDate);
    const filteredEvents = events.filter(event => {
      const eventStartDate = new Date(event.start);
      // console.log(eventStartDate);
      return (
        eventStartDate.getDate() === eventDate.getDate() &&
        eventStartDate.getMonth() === eventDate.getMonth() &&
        eventStartDate.getFullYear() === eventDate.getFullYear()
      );
    });
    // console.log(filteredEvents);

    const occupiedSlots = filteredEvents.flatMap(event => {
      const eventStartDate = new Date(event.start);
      const eventEndDate = new Date(event.end);
      const slots = [];

      let currentSlot = new Date(eventStartDate);

      while (currentSlot < eventEndDate) {
        slots.push(currentSlot);
        currentSlot = new Date(currentSlot.getTime() + 60 * 60000);
      }

      return slots;
    });

    setOccupiedSlots(occupiedSlots);
  }, [events, SelectInfos.startStr, SelectInfos.endStr]);

  // console.log(occupiedSlots);
  // console.log(SelectInfos.endStr);
  
  const decDate = (enddate) => {
    // Assuming SelectInfos.endStr is a valid date string like "2024-03-09"
const endStr = enddate; // Store the original date string

// Create a new Date object using the original date string
const endDate = new Date(endStr);

// Decrease the date by one day
endDate.setDate(endDate.getDate() - 1);

// Convert the updated date back to a string
const updatedEndStr = endDate.toISOString().split('T')[0]; // Format as "YYYY-MM-DD"

return updatedEndStr; // Output the updated date string
}
  const handleClick = () => {

    const calendarApi = SelectInfos.view.calendar;
    const newEvent = {
      title: title,
      start: `${SelectInfos.startStr}${moment(startTime).format("THH:00:00")}`,
      end: `${decDate(SelectInfos.endStr)}${moment(endTime).format("THH:00:00")}`,
    };

    calendarApi.addEvent(newEvent);
    setEvents((prevEvents) => [...prevEvents, newEvent]);

    // setTitle("");
    // setStartTime(new Date());
    // setEndTime(new Date());
    setShowModal(false);
  };

  console.log(occupiedSlots);
  const filterTime = (time) => {
    const timeValue = time.getTime();
    // console.log(time);
    // console.log(occupiedSlots[0].getTime());
    // console.log(timeValue);
    return !occupiedSlots.some(slot => slot.getTime() === timeValue);
  };
  
  return (
    <div className="modalStyle">
      <h6>From: {SelectInfos.startStr}</h6>
      <h6>To: {SelectInfos.endStr}</h6>
      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="inputStyle"
      />
      <label htmlFor="StartTime">StartTime :</label>
      <DatePicker
        id="StartTime"
        selected={startTime}
        onChange={(date) => setStartTime(date)}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={60}
        timeCaption="Time"
        dateFormat="hh:mm aa"
        // minTime={startTime}
        // maxTime={endTime}
        filterTime={filterTime}
        className="datePickerStyle"
      />
      <label htmlFor="EndTime">EndTime :</label>
      <DatePicker
        id="EndTime"
        selected={endTime}
        onChange={(date) => setEndTime(date)}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={60}
        timeCaption="Time"
        dateFormat="hh:mm aa"
        // minTime={startTime}
        // maxTime={endTime}
        filterTime={filterTime}
        className="datePickerStyle"
      />
      <button className="buttonStyle" onClick={handleClick}>
        Submit
      </button>
    </div>
  );
};

export default Modal;
