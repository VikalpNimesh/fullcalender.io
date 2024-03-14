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

  console.log(occupiedSlots);
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
  }, [events, SelectInfos.startStr]);

  // console.log(occupiedSlots);
// console.log(SelectInfos.endStr);
  const handleClick = () => {
    const calendarApi = SelectInfos.view.calendar;
    const newEvent = {
      title: title,
      start: `${SelectInfos.startStr}${moment(startTime).format("THH:00:00")}`,
      end: `${SelectInfos.endStr}${moment(endTime).format("THH:00:00")}`,
    };

    calendarApi.addEvent(newEvent);
    setEvents((prevEvents) => [...prevEvents, newEvent]);

    setTitle("");
    setStartTime(new Date());
    setEndTime(new Date());
    setShowModal(false);
  };

  const filterTime = (time) => {
    console.log(time);
   console.log(time);
    const timeValue = time.getTime();
    // console.log(timeValue); 
      const p = !occupiedSlots.some((slot) => slot.getTime() === timeValue);
    console.log("ds" ,p);
    return p
  }
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
        minTime={startTime}
        maxTime={endTime}
        filterTime={(time)=>filterTime(time)}
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
        filterTime={(time)=>filterTime(time)}
        className="datePickerStyle"
      />
      <button className="buttonStyle" onClick={handleClick}>
        Submit
      </button>
    </div>
  );
};

export default Modal;
