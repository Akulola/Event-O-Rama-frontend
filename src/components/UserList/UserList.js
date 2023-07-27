import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import avatar from "./avatar.png";
import './UserList.css'

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div>
      <div className="user-list">
        {users.map((user) => (
          <Link key={user.id} to={`/users/${user.id}/events`}>
            <img className= 'avatar' src={avatar} alt={user.name} />
            <p>{user.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserList;