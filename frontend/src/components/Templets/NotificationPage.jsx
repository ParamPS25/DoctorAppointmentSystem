                                           
import React, { useState, useEffect } from "react";
import "./NotificationPage.css";
import { format } from 'date-fns';
import LoadingSpinner from "../../reusables/LoadinSpinner";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(null); // To manage errors
  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(0); // Total pages from the API

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Function to fetch notifications from the API
  const fetchNotifications = async (currentPage) => {
    try {
      setLoading(true); 
      const NODE_ENV = import.meta.env.VITE_NODE_DOC_API;
      const response = await fetch(NODE_ENV+`/api/book/notifications?page=${currentPage}`, {
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
      setNotifications(data.notifications || []); //the response contains an array of notifications
      setTotalPages(data.totalPages || 0) 
      setLoading(false); // Set loading to false once data is fetched

    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Fetch notifications when the component mounts or when the page changes
  useEffect(() => {
    fetchNotifications(page);
  }, [page]);

  const formatDate = (isoString) => {
    const formattedDate = format(new Date(isoString), 'yyyy-MM-dd');
    const formattedTime = format(new Date(isoString), 'HH:mm:ss');
    
    return  formattedTime + " " + formattedDate ;
  }

  return (
    <div className="notification-container">
      <h1 className="notification-title">Notifications</h1>
      
      {loading ? (
        // <p>Loading...</p> // Show loading message while fetching data
        <LoadingSpinner/>
      ) : error ? (
        <p>Error: {error}</p> // Show error message if there's an issue with fetching data
      ) : notifications.length > 0 ? (
        <>
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
                <td>{formatDate(notification.createdAt)}</td>

              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination-controls">
        <button
          className="pagination-button"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1} // Disable "Previous" on the first page
        >
          Previous
        </button>
        <span className="pagination-info">
          Page {page} of {totalPages}
        </span>
        <button
          className="pagination-button"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages} // Disable "Next" on the last page
        >
          Next
        </button>
      </div>
      </>
      ) : (
        <p>No notifications available.</p>
      )}
    </div>
  );
};

export default NotificationPage;