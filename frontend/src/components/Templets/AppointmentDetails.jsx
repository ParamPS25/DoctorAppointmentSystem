import React, { useState } from "react";
import "./AppointmentStyles/AppointmentDetails.css";
import { format } from "date-fns";

const AppointmentDetails = ({ appointment, onClose, onAction }) => {
  const [loadingAction, setLoadingAction] = useState(null); // Track which action is loading
  const [error, setError] = useState(null); // State for error messages

  const handleAction = async (id, action) => {
    setLoadingAction(action); // Set the current loading action
    setError(null); // Reset error state
    try {
      await onAction(id, action);
    } catch (err) {
      setError("Failed to update status. Please try again.");
    } finally {
      setLoadingAction(null); // Reset loading state
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "yellow"; // Yellow for pending
      case "confirmed":
        return "green"; // Green for confirmed
      case "cancelled":
        return "red"; // Red for cancelled
      default:
        return "blue"; // Default color
    }
  };

  const formatDate = (isoString) => {
    const formattedDate = format(new Date(isoString), "yyyy-MM-dd");
    return formattedDate;
  };

  return (
    <div className="details-card">
      <div className="details-card-header">
        <h3>Appointment Details</h3>
        <button className="details-close-btn" onClick={onClose} disabled={loadingAction !== null}>
          X
        </button>
      </div>

      <div className="details-card-body">
        <p>
          <strong>Patient name:</strong>{" "}
          {`${appointment.patientId.baseUserId.firstname} ${appointment.patientId.baseUserId.lastname}`}
        </p>
        <p>
          <strong>Doctor name:</strong>{" "}
          {`Dr ${appointment.doctorId.baseUserId.firstname} ${appointment.doctorId.baseUserId.lastname}`}
        </p>
        <p><strong>Date:</strong> {formatDate(appointment.appointmentDate)}</p>
        <p><strong>Time:</strong> {appointment.appointmentTime}</p>
        <p>
          <strong>Email:</strong>{" "}
          {appointment.patientId.baseUserId.email || appointment.doctorId.baseUserId.email}
        </p>
        <p><strong>Fees:</strong> {appointment.doctorId.fees} Rs</p>
        <p><strong>Notes:</strong> {appointment.notes}</p>
        <p className={`status-color ${getStatusColor(appointment.status)}`}>
          <strong>Status:</strong> {appointment.status}
        </p>

        {error && <p className="error-message">{error}</p>}

        {onAction && appointment.status === "pending" && (
          <div className="details-action-buttons">

            <button
              onClick={() => handleAction(appointment._id, "confirmed")}
              className="details-approve-btn"
              disabled={loadingAction === "confirmed"}
            >
              {loadingAction === "confirmed" ? "Approving..." : "Approve"}
            </button>

            <button
              onClick={() => handleAction(appointment._id, "cancelled")}
              className="details-reject-btn"
              disabled={loadingAction === "cancelled"}
            >
              {loadingAction === "cancelled" ? "Rejecting..." : "Reject"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentDetails;
