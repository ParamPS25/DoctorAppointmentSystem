import { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(200, 239, 221)',
    padding: '20px'
  },
  card: {
    maxWidth: '600px',
    width: '100%',
    padding: '30px',
    borderRadius: '16px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
    marginBottom: '30px',
    background: 'linear-gradient(135deg,#e6eef2, #b8dff2, #71dfd0 , #42f1d9 )',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    fontWeight: 'bolder',
    padding: '20px',
    fontSize: '28px',
  },
  doctorInfo: {
    marginBottom: '20px',
    padding: '15px',
    border: '1px solid grey',
    borderRadius: '20px',
    textAlign: 'center'
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#555',
    fontWeight: 'bold',
    fontSize: '18px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  timeSlotsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'center',
  },
  timeSlotButton: (isSelected) => ({
    padding: '10px',
    backgroundColor: isSelected ? '#007BFF' : '#e0e0e0',
    color: isSelected ? 'white' : 'black',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '80px',
  }),
  textarea: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    resize: 'none',
  },
  submitButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  popup: (isSuccess) => ({
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: isSuccess ? '#d4edda' : '#f8d7da',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    zIndex: '1000',
    textAlign: 'center',
  }),
  closeButton: {
    padding: '10px',
    backgroundColor: '#FF5722',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '15px',
  }
};

const AppointmentPatientSide = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { state: doctor } = useLocation();
  const [formData, setFormData] = useState({ appointmentDate: '', appointmentTime: '', notes: '' });
  const [popupMessage, setPopupMessage] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const timeSlots = Array.from({ length: 9 }, (_, i) => `${(9 + i).toString().padStart(2, '0')}:00`);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTimeSlotClick = (time) => {
    setFormData((prevData) => ({ ...prevData, appointmentTime: time }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const appointmentData = { ...formData, doctorId };

    try {
      const NODE_ENV = import.meta.env.VITE_NODE_DOC_API;
      const response = await fetch(NODE_ENV+`/api/book/${doctorId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(appointmentData),
      });

      const result = await response.json();
      setPopupMessage(result.success ? 'Your appointment has been booked!' : 'Failed to book appointment or this time slot has already been booked.');
      setIsSuccess(result.success);
      setIsPopupVisible(true);
      if (result.success) setTimeout(() => navigate('/Appointments'), 5000);
      setFormData({ appointmentDate: '', appointmentTime: '', notes: '' });
    } catch (err) {
      console.error('Error booking appointment:', err);
      setPopupMessage('There was an error while booking your appointment.');
      setIsSuccess(false);
      setIsPopupVisible(true);
    }
  };

  const handleClosePopup = () => setIsPopupVisible(false);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Book an Appointment</h1>
        {doctor && (
          <div style={styles.doctorInfo}>
            <h2><strong>Dr. {doctor.baseUserId.firstname} {doctor.baseUserId.lastname}</strong></h2>
            <p><strong>Specialization:</strong> {doctor.specialization}</p>
            <p><strong>Experience:</strong> {doctor.experience} years</p>
            <p><strong>Fees:</strong> {doctor.fees} Rs</p>
            <p><strong>Mobile No.:</strong> {doctor.baseUserId.phoneNumber}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Appointment Date:</label>
          <input type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} required style={styles.input} />

          <label style={styles.label}>Appointment Time:</label>
          <div style={styles.timeSlotsContainer}>
            {timeSlots.map((time) => (
              <button key={time} type="button" onClick={() => handleTimeSlotClick(time)} style={styles.timeSlotButton(formData.appointmentTime === time)}>{time}</button>
            ))}
          </div>

          <label style={styles.label}>Notes:</label>
          <textarea name="notes" value={formData.notes} onChange={handleChange} rows="4" style={styles.textarea} />

          <button type="submit" style={styles.submitButton}>Submit</button>
        </form>
      </div>

      {isPopupVisible && (
        <div style={styles.popup(isSuccess)}>
          <h3>{popupMessage}</h3>
          <button onClick={handleClosePopup} style={styles.closeButton}>Close</button>
        </div>
      )}
    </div>
  );
};

export default AppointmentPatientSide;
