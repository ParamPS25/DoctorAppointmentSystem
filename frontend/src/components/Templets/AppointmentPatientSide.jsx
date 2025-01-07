import React, { useState } from 'react';

const AppointPatientSide = () => {
  const [formData, setFormData] = useState({
    appointmentDate: '',
    appointmentTime: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Appointment Details:', formData);
    alert('Appointment submitted successfully!');
    setFormData({
      appointmentDate: '',
      appointmentTime: '',
      notes: '',
    });
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
            <label htmlFor="appointmentDate" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>
            appointmentDate:
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
            <label htmlFor="appointmentTime" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>
            appointmentTime:
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
            notes:
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
    </div>
  );
};

export default AppointPatientSide;
