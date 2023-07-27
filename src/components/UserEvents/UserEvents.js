import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./UserEvents.css";

const UserEvents = () => {
  const { userId } = useParams();
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start_time: "",
    end_time: "",
    location: "",
    agenda: "",
    image_url: "",
  });

  useEffect(() => {
    fetch(`http://localhost:9292/users/${userId}/events`)
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching user events:", error));
  }, [userId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleCreateEvent = (event) => {
    event.preventDefault();
    fetch("http://localhost:9292/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setEvents([...events, data]);
        setFormData({
          title: "",
          description: "",
          start_time: "",
          end_time: "",
          location: "",
          agenda: "",
          image_url: "",
          attendees: [],
        });
      })
      .catch((error) => console.error("Error creating event:", error));
  };

  const handleDeleteEvent = (eventId) => {
    fetch(`http://localhost:9292/events/${eventId}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedEvents = events.filter((event) => event.id !== eventId);
        setEvents(updatedEvents);
      })
      .catch((error) => console.error("Error deleting event:", error));
  };

  return (
    <div>
      <h2>User Events</h2>
      <div className="user-events-container">
        {events.map((event) => (
          <div className="user-event-card" key={event.id}>
            <div className="user-event-header">
              <h3 className="user-event-title">{event.title}</h3>
            </div>
            <div className="user-event-body">
              <Link to={`/events/${event.id}`}>
                <img
                  className="user-event-image"
                  src={event.image_url}
                  alt={event.title}
                />
              </Link>
            </div>
            <div className="user-event-footer">
              <button
                className="delete-button"
                onClick={() => handleDeleteEvent(event.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="create-event-form">
        <h2>Create Event</h2>
        <form onSubmit={handleCreateEvent}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Start Time:
            <input
              type="datetime-local"
              name="start_time"
              value={formData.start_time}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            End Time:
            <input
              type="datetime-local"
              name="end_time"
              value={formData.end_time}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Agenda:
            <textarea
              name="agenda"
              value={formData.agenda}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Image URL:
            <input
              type="text"
              name="image_url"
              value={formData.image_url}
              onChange={handleInputChange}
              required
            />
          </label>
          
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default UserEvents;
