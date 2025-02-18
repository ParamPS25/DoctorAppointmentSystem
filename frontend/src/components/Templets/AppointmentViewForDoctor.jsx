import React, { useState } from "react";
// import "./AppointmentView.css";              -- was causing error
import "./AppointmentStyles/AppointmentViewForDoctor.css"
import AppointmentDetails from "./AppointmentDetails";
import axios from "axios";
import { format } from 'date-fns';

const AppointmentViewForDoctor = ({ appointments }) => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleAction = async (id, action) => {
    try {
      const NODE_ENV = import.meta.env.VITE_NODE_DOC_API;
      await axios.patch(
        NODE_ENV + `/api/book/status/${id}`,
        { status: action },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json", // Specify JSON content type
          },
        }
      );
      setSelectedAppointment({ ...selectedAppointment, status: action });
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'yellow'; // Yellow for pending
      case 'confirmed':
        return 'green'; // Green for confirmed
      case 'cancelled':
        return 'red'; // Red for cancelled
      default:
        return 'blue'; // Default color (if any)
    }
  }

  const formatDate = (isoString) => {
      const formattedDate = format(new Date(isoString), 'yyyy-MM-dd');
      // const formattedTime = format(new Date(isoString), 'HH:mm:ss');
      
      return formattedDate ;
    }

    const formatDateTime = (isoString) => {
      const formattedDate = format(new Date(isoString), 'yyyy-MM-dd');
      const formattedTime = format(new Date(isoString), 'HH:mm:ss');
      
      return `${formattedDate} (${formattedTime})` ;
    }

  return (
    <div className="doctor-table-container">
      <h2 className="doctor-table-heading">Doctor's Appointment Details</h2>
      <table className="doctor-appointment-table">
        <thead>
          <tr className="doctor-table-header">
            <th>Patient Name</th>
            <th>Appointment Date</th>
            <th>Patient Email</th>
            <th>Requested At</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className="doctor-table-body">
          {appointments.map((appointment) => (
            <tr
              key={appointment._id}
              className="doctor-table-row"
              onClick={() => setSelectedAppointment(appointment)}
            >
              <td>
                {appointment.patientId?.baseUserId?.firstname}{" "}
                {appointment.patientId?.baseUserId?.lastname}
              </td>
              <td>{formatDate(appointment.appointmentDate)}</td>
              <td>{appointment.patientId?.baseUserId?.email}</td>
              <td>{formatDateTime(appointment.createdAt)}</td>
              <td className={`status-color ${getStatusColor(appointment.status)}`}>
                {appointment.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedAppointment && (
        <AppointmentDetails
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
          onAction={handleAction}
        />
      )}
    </div>
  );
};

export default AppointmentViewForDoctor;
