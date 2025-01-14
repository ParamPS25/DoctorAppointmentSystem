  import React, { useState } from "react";
  // import "./AppointmentView.css";              -- was causing error
  import "./AppointmentStyles/AppointmentViewForPatient.css"
  import AppointmentDetails from "./AppointmentDetails";
  import { format } from 'date-fns';

  const AppointmentViewForPatient = ({ appointments }) => {
    const [selectedAppointment, setSelectedAppointment] = useState(null);

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
    };
  

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
      <div className="patient-table-container">
        <h2 className="patient-table-heading">Patient's Appointments</h2>
        <table className="patient-appointment-table">
          <thead>
            <tr className="patient-table-header">
              <th>Doctor Name</th>
              <th>Doctor Specialization</th>
              <th>Appointment Date</th>
              <th>Requested At</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="patient-table-body">
            {appointments.map((appointment) => (
              <tr
                key={appointment._id}
                className="patient-table-row"
                onClick={() => setSelectedAppointment(appointment)}
              >
                <td>{`${appointment.doctorId.baseUserId.firstname} ${appointment.doctorId.baseUserId.lastname}`}</td>
                <td>{appointment.doctorId.specialization}</td>
                <td>{formatDate(appointment.appointmentDate)}</td>
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
          />
        )}
      </div>
    );
  };
  
  export default AppointmentViewForPatient;
  