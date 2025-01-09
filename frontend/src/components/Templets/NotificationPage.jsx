import React, { useState } from "react";
import "./NotificationPage.css";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState(
    [
      {
        "_id": "677fdb8890bc6d5b3b4fabba",
        "recipient": "677567b0d0249c65a6d23f4c",
        "recipientModel": "Doctor",
        "title": "New Appointment Request",
        "message": "You have a new appointment request from bhavsarparam1941@gmail.com for 2025-01-29 on 20:00",
        "releatedTo": "677fdb8890bc6d5b3b4fabb8",
        "isRead": false,
        "createdAt": "2025-01-09T14:22:00.331Z",
        "updatedAt": "2025-01-09T14:22:00.331Z",
        "__v": 0
      },
      {
        "_id": "677fc4db5059ce6046ce161a",
        "recipient": "677567b0d0249c65a6d23f4c",
        "recipientModel": "Doctor",
        "title": "New Appointment Request",
        "message": "You have a new appointment request from bhavsarparam1941@gmail.com for 2025-01-25 on 15:30",
        "releatedTo": "677fc4db5059ce6046ce1618",
        "isRead": false,
        "createdAt": "2025-01-09T12:45:15.969Z",
        "updatedAt": "2025-01-09T12:45:15.969Z",
        "__v": 0
      },
      {
        "_id": "677fc4725059ce6046ce160d",
        "recipient": "677567b0d0249c65a6d23f4c",
        "recipientModel": "Doctor",
        "title": "New Appointment Request",
        "message": "You have a new appointment request from bhavsarparam1941@gmail.com for 2025-01-18 on 18:29",
        "releatedTo": "677fc4725059ce6046ce160b",
        "isRead": false,
        "createdAt": "2025-01-09T12:43:30.783Z",
        "updatedAt": "2025-01-09T12:43:30.783Z",
        "__v": 0
      },
      
      
    ]
  );

  // Function to add a new notification
  const addNotification = () => {
    const newNotification = {
      _id: new Date().getTime().toString(), // Unique ID based on timestamp
      recipient: "newRecipientId",
      recipientModel: "Patient",
      title: "New Appointment Notification",
      message: "Your appointment has been scheduled.",
      releatedTo: "newRelatedToId",
      
      isRead: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0,
    };

    setNotifications((prevNotifications) => {
      // Add the new notification and keep only the latest 5
      const updatedNotifications = [newNotification, ...prevNotifications];
      return updatedNotifications.slice(0, 5); // Keep only the 5 most recent notifications
    });
  };

  return (
    <div className="notification-container">
      <h1 className="notification-title">Notifications</h1>
      
      
      {notifications.length > 0 ? (
        <table className="notification-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Message</th>
              <th>Related To</th>
              
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification) => (
              <tr key={notification._id}>
                <td>{notification.title}</td>
                <td>{notification.message}</td>
                <td>{notification.releatedTo}</td>
               
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
