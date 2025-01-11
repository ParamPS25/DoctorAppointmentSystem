import React, { useState } from "react";
import "./AppointmentView.css"; // Importing the CSS file

const AppointmentViewForDoctor = () => {
  // Dummy data for doctor appointments
  const doctorAppointments = [
    {
      id: 1,
      patientName: "John Doe",
      appointmentDate: "12/12/2021",
      appointmentTime: "12:00",
      patientEmail: "john.doe@example.com",
      patientPhone: "123-456-7890",
      status: "Pending",
      fees: "1000",
    },
    {
      id: 2,
      patientName: "Jane Smith",
      appointmentDate: "12/12/2021",
      appointmentTime: "12:00",
      patientEmail: "jane.smith@example.com",
      patientPhone: "987-654-3210",
      status: "Pending",
      fees: "500",
    },
  ];

  // State for the appointments data
  const [appointmentData, setAppointmentData] = useState(doctorAppointments);

  // State for selected appointment details
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Handle accept/reject action for doctor
  const handleAction = (id, action) => {
    setAppointmentData((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === id ? { ...appointment, status: action } : appointment
      )
    );
    // Update the selected appointment status immediately
    if (selectedAppointment && selectedAppointment.id === id) {
      setSelectedAppointment({ ...selectedAppointment, status: action });
    }
  };

  // Handle row click to open detailed info card
  const handleRowClick = (appointment) => {
    setSelectedAppointment(appointment);
  };

  // Handle closing the appointment details card
  const handleCloseCard = () => {
    setSelectedAppointment(null);
  };

  return (
    <div className="table-container">
      <h2 className="table-heading">Doctor's View</h2>
      <table className="appointment-table">
        <thead>
          <tr className="table-header">
            <th>Patient Name</th>
            <th>Appointment Date</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {appointmentData.map((appointment) => (
            <tr
              key={appointment.id}
              onClick={() => handleRowClick(appointment)}
              style={{ cursor: "pointer" }}
            >
              <td>{appointment.patientName}</td>
              <td>{appointment.appointmentDate}</td>
              <td>{appointment.patientEmail}</td>
              <td>{appointment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Appointment Details Card (Modal) */}
      {selectedAppointment && (
        <div className="appointment-card">
          <div className="card-header">
            <h3>Appointment Details</h3>
            <button className="close-btn" onClick={handleCloseCard}>
              X
            </button>
          </div>
          <div className="card-body">
            <p><strong>Patient Name:</strong> {selectedAppointment.patientName}</p>
            <p><strong>Date:</strong> {selectedAppointment.appointmentDate}</p>
            <p><strong>Time:</strong> {selectedAppointment.appointmentTime}</p>
            <p><strong>Patient Email:</strong> {selectedAppointment.patientEmail}</p>
            <p><strong>Patient Phone:</strong> {selectedAppointment.patientPhone}</p>
            <p><strong>Fees:</strong> {selectedAppointment.fees}</p>
            <div className="action-buttons">
              {selectedAppointment.status === "Pending" && (
                <>
                  <button
                    onClick={() => handleAction(selectedAppointment.id, "Approved")}
                    className="approve-btn"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(selectedAppointment.id, "Rejected")}
                    className="reject-btn"
                  >
                    Reject
                  </button>
                </>
              )}
              {selectedAppointment.status !== "Pending" && (
                <p><strong>Status:</strong> {selectedAppointment.status}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const App = () => {
  return (
    <div className="app">
      <AppointmentViewForDoctor />
    </div>
  );
};

export default AppointmentViewForDoctor;
