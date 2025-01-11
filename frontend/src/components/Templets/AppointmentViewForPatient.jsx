import React, { useState } from "react";
import "./AppointmentView.css"; // Importing the CSS file

const AppointmentViewForPatient = () => {
  // Separate dummy data for patient view
  const patientAppointments = [
    {
      id: 1,
      patientName: "John Doe",
      doctorName: "Dr. Smith",
      doctorSpecialization: "Cardiologist",
      doctorEmail:"abc@exa.com",
      appointmentDate:"12/12/2021",
      appointmentTime:"12:00",
      fees:"500",
      status: "Pending",
      
      
    },
    {
      id: 2,
      patientName: "Jane Smith",
      doctorName: "Dr. Brown",
      doctorSpecialization: "Dermatologist",
      doctorEmail:"abc@exa.com",
      appointmentDate:"12/12/2021",
      appointmentTime:"12:00",
     fees:"1000",
      status: "Pending",
      
    },
  ];

  // State for selected appointment details (patient's view)
  const [appointmentData] = useState(patientAppointments);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Handle row click to open detailed info card for the patient
  const handleRowClick = (appointment) => {
    setSelectedAppointment(appointment);
  };

  // Handle closing the appointment details card
  const handleCloseCard = () => {
    setSelectedAppointment(null);
  };

  return (
    <div className="appointment-table-container">
      <h2 className="table-heading">Patient's Appointments</h2>
      <table className="appointment-table">
        <thead>
          <tr className="table-header">
            <th>Patient Name</th>
            <th>Doctor Name</th>
            <th>Doctor Specialization</th>
            <th>Status</th>
            

          </tr>
        </thead>
        <tbody className="table-body">
          {appointmentData.map((appointment) => (
            <tr
              key={appointment.id}
              onClick={() => handleRowClick(appointment)}
              className="appointment-row"
            >
              <td>{appointment.patientName}</td>
              <td>{appointment.doctorName}</td>
              <td>{appointment.doctorSpecialization}</td>
              <td className="status-color">{appointment.status}</td>
              
              {/* <td>{appointment.fees}</td> */}
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
            <p><strong>Doctor Name:</strong> {selectedAppointment.doctorName}</p>
            <p><strong>Doctor Specialization:</strong> {selectedAppointment.doctorSpecialization}</p>
            <p><strong>Date:</strong> {selectedAppointment.appointmentDate}</p>
            <p><strong>Time:</strong> {selectedAppointment.appointmentTime}</p>
            <p><strong>Doctor email:</strong>{selectedAppointment.doctorEmail}</p>
            <p><strong>Fees:</strong> {selectedAppointment.fees}</p>
            <p><strong>Status:</strong> {selectedAppointment.status}</p>
            
          </div>
        </div>
      )}
    </div>
  );
};

const App = () => {
  return (
    <div className="app">
      <AppointmentViewForPatient />
    </div>
  );
};

export default App;
