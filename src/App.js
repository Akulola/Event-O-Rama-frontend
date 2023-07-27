import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import UserList from "./components/UserList/UserList";
import UserEvents from "./components/UserEvents/UserEvents";
import EventDetail from "./components/EventDetail/EventDetail";
import EditEvent from "./components/EditEvent/EditEvent";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/users/:userId/events" element={<UserEvents />} />
        <Route path="/events/:eventId" element={<EventDetail />} />
        <Route path="/events/:eventId/edit" element={<EditEvent />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
