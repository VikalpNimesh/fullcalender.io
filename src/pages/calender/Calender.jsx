import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
import Modal from "../../components/Modal";
import "./Calender.css";

const Calender = () => {
  const [events, setEvents] = useState([
    {
      title: "Meeting",
      start: "2024-03-01T10:00:00",
      end: "2024-03-01T11:00:00",
      backgroundColor: "green",
      textColor: "white",
    },
    {
      title: "Party",
      start: "2024-03-01T01:00:00",
      end: "2024-03-01T05:00:00",
      backgroundColor: "blue",
      textColor: "white",
    },
    {
      title: "Ghuumi Ghuumi",
      start: "2024-03-04T01:00:00",
      end: "2024-03-06T05:00:00",
      backgroundColor: "red",
      textColor: "white",
    },
    {
      title: "Ghusumi Ghuumi",
      start: "2024-03-04T05:00:00",
      end: "2024-03-06T08:00:00",
      backgroundColor: "red",
      textColor: "white",
    },
  ]);
  console.log(events);
  const [showModal, setShowModal] = useState(false);
  const [SelectInfos, setSelectInfos] = useState({})
  const [currentEvents, setCurrentEvents] = useState([]);

  const handleEventClick = (clickInfo) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events) => {
    setCurrentEvents(events);
  };

  const handleDateSelect = (selectInfo) => {
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    setShowModal(true);
    setSelectInfos(selectInfo)
  };

 
  return (
    <div className="main">
      <div className="modalbox">
        {showModal && (
          <Modal
            setShowModal={setShowModal}
            setEvents={setEvents}
            // modelData={modelData}
            SelectInfos={SelectInfos}
            events={events}
            setSelectInfos={setSelectInfos}
          />
        )}
      </div>
      <div className="calender">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          selectable={true}
          // select={handleSelect}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events}
          editable={true}
          // selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
         
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
          // slotDuration={"00:15:00"}
          // slotLabelInterval={"01:00"}
        />
      </div>
    </div>
  );
};

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
export default Calender;
