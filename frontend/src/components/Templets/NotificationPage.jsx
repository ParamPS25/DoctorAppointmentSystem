                                           
import React, { useState, useEffect } from "react";
import "./NotificationPage.css";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(null); // To manage errors

  // Function to fetch notifications from the API
  const fetchNotifications = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/book/notifications", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensure to send cookies (if needed)
      });

      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }

      const data = await response.json();
      setNotifications(data.notifications); // Assuming the response contains an array of notifications
      setLoading(false); // Set loading to false once data is fetched
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Fetch notifications when the component mounts
  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="notification-container">
      <h1 className="notification-title">Notifications</h1>
      
      {loading ? (
        <p>Loading...</p> // Show loading message while fetching data
      ) : error ? (
        <p>Error: {error}</p> // Show error message if there's an issue with fetching data
      ) : notifications.length > 0 ? (
        <table className="notification-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Message</th>
              <th>Related To</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification) => (
              <tr key={notification._id}>
                <td>{notification.title}</td>
                <td>{notification.message}</td>
                <td>{notification.releatedTo}</td>
                <td>{notification.createdAt}</td>

              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No notifications available.</p>
      )}
    </div>
  );
};

export default NotificationPage;