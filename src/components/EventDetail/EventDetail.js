import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./EventDetail.css";

const EventDetail = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [attendeeFormData, setAttendeeFormData] = useState({
    name: "",
    surname: "",
    email: "",
  });

  
  useEffect(() => {
    fetch(`http://localhost:9292/events/${eventId}`)
    .then((response) => response.json())
    .then((data) => {
      setEvent(data);
      fetchAttendees(eventId); 
    })
    .catch((error) => console.error("Error fetching event details:", error));
  }, [eventId]);



  const fetchAttendees = (eventId) => {
    fetch(`http://localhost:9292/events/${eventId}/attendees`)
      .then((response) => response.json())
      .then((data) => {
        setEvent((prevEvent) => ({
          ...prevEvent,
          attendees: data,
        }));
      })
      .catch((error) =>
        console.error("Error fetching event attendees:", error)
      );
  };

  const handleAttendeeChange = (event) => {
    const { name, value } = event.target;
    setAttendeeFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddAttendee = (event) => {
    event.preventDefault();
    const { name, surname, email } = attendeeFormData;
    const attendeeData = { name, surname, email };

    fetch(`http://localhost:9292/attendees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(attendeeData),
    })
      .then((response) => response.json())
      .then((data) => {
        setEvent((prevEvent) => ({
          ...prevEvent,
          attendees: [...prevEvent.attendees, data],
        }));
        setAttendeeFormData({
          name: "",
          surname: "",
          email: "",
        });
      })
      .catch((error) =>
        console.error("Error adding attendee to the event:", error)
      );
  };

  const handleDeleteAttendee = (attendeeId) => {
    fetch(`http://localhost:9292/attendees/${attendeeId}`, {
      method: "DELETE",
    })
      .then(() => {
        setEvent((prevEvent) => ({
          ...prevEvent,
          attendees: prevEvent.attendees.filter(
            (attendee) => attendee.id !== attendeeId
          ),
        }));
      })
      .catch((error) => console.error("Error deleting attendee:", error));
  };

  return (
    <div>
      {event ? (
        <div className="container">
          <h2>{event.title}</h2>
          <img className="poster" src={event.image_url} alt={event.title} />
          <h4>Description: {event.description}</h4>
          <p>Start Time: {event.start_time}</p>
          <p>End Time: {event.end_time}</p>
          <p>Location: {event.location}</p>
          <p>Agenda: {event.agenda}</p>

          {event.attendees && event.attendees.length > 0 ? (
            <div className="attendees">
              <h3>Attendees:</h3>
              <ul>
                {event.attendees.map((attendee) => (
                  <li key={attendee.id}>
                    {attendee.name} {attendee.surname}
                    <button
                      className="delete-attendee-button"
                      onClick={() => handleDeleteAttendee(attendee.id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No attendees for this event.</p>
          )}

          <div className="add-attendee-form">
            <h3>Add Attendee:</h3>
            <form onSubmit={handleAddAttendee}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={attendeeFormData.name}
                  onChange={handleAttendeeChange}
                  required
                />
              </label>
              <label>
                Surname:
                <input
                  type="text"
                  name="surname"
                  value={attendeeFormData.surname}
                  onChange={handleAttendeeChange}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={attendeeFormData.email}
                  onChange={handleAttendeeChange}
                  required
                />
              </label>
              <button type="submit">Add Attendee</button>
            </form>
          </div>
        </div>
      ) : (
        <p>Loading event details...</p>
      )}
    </div>
  );
};

export default EventDetail;
