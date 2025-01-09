import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AppointmentPatientSide = () => {
  const { doctorId } = useParams(); // Extract doctorId from URL parameters
  const navigate = useNavigate(); // Initialize useNavigate hook for page navigation
  const [formData, setFormData] = useState({
    appointmentDate: '',
    appointmentTime: '',
    notes: '',
  });
  const [popupMessage, setPopupMessage] = useState(''); // New state for the popup message
  const [isPopupVisible, setIsPopupVisible] = useState(false); // To control popup visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Include the doctorId in the API payload
    const appointmentData = {
      ...formData,
      doctorId, // Add the doctorId
    };

    try {
      const response = await fetch(`http://localhost:8080/api/book/${doctorId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // This ensures cookies are sent with the request
        body: JSON.stringify(appointmentData),
      });

      const result = await response.json();

      if (result.success) {
        // Show success message based on the status
        if (result.populatedResult.status === 'confirmed') {
          setPopupMessage('Your appointment has been confirmed!');
        } else if (result.populatedResult.status === 'cancelled') {
          setPopupMessage('Your appointment has been cancelled!');
        } else {
          setPopupMessage('Your appointment is booked and is pending for confirmation.');
        }
        setIsPopupVisible(true); // Show the popup
        
        // Navigate to the "AllAppointments" page after successful booking
        setTimeout(() => {
          navigate('/Appointments'); // Redirect after 2 seconds (or as desired)
        }, 5000); // Adjust time as necessary
      } else {
        setPopupMessage('Failed to book appointment.');
        setIsPopupVisible(true);
      }

      // Clear the form data after submission
      setFormData({
        appointmentDate: '',
        appointmentTime: '',
        notes: '',
      });
    } catch (err) {
      console.error('Error booking appointment:', err);
      setPopupMessage('There was an error while booking your appointment.');
      setIsPopupVisible(true);
    }
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '65vh',
        width: '32vw',
        backgroundColor: '#f5f5f5',
        marginLeft: '550px',
      }}
    >
      <div
        style={{
          maxWidth: '400px',
          width: '100%',
          padding: '20px',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ textAlign: 'center', color: '#333' }}>Book an Appointment</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label
              htmlFor="appointmentDate"
              style={{ display: 'block', marginBottom: '5px', color: '#555' }}
            >
              Appointment Date:
            </label>
            <input
              type="date"
              id="appointmentDate"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label
              htmlFor="appointmentTime"
              style={{ display: 'block', marginBottom: '5px', color: '#555' }}
            >
              Appointment Time:
            </label>
            <input
              type="time"
              id="appointmentTime"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="notes" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>
              Notes:
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                resize: 'none',
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#007BFF',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            Submit
          </button>
        </form>
      </div>

      {/* Popup for appointment status */}
      {isPopupVisible && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: '1000',
            textAlign: 'center',
          }}
        >
          <h3>{popupMessage}</h3>
          <button
            onClick={handleClosePopup}
            style={{
              padding: '10px',
              backgroundColor: '#FF5722',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '15px',
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default AppointmentPatientSide;
