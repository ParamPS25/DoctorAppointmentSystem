import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cards.css';
import { Link } from 'react-router-dom';

const Cards = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/doctors/', {
          withCredentials: true,
        });
        if (response.data.message === 'success') {
          setDoctors(response.data.doctors);
          setFilteredDoctors(response.data.doctors);
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  // Search filtering based on name (firstname - lastname), specialization, and location
  useEffect(() => {
    const results = doctors.filter((doctor) => {
      return (
        `${doctor.baseUserId.firstname} ${doctor.baseUserId.lastname}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (doctor.location && doctor.location.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });

    setFilteredDoctors(results);
  }, [searchTerm, doctors]);

  // Function to render star ratings
  const renderStars = (rating) => {
    const totalStars = 5;
    const brightStars = Math.floor(rating);
    const dullStars = totalStars - brightStars;

    return (
      <div>
        {[...Array(brightStars)].map((_, index) => (
          <span key={index} style={{ color: '#FFD700', fontSize: '40px' }}>★</span>
        ))}
        {[...Array(dullStars)].map((_, index) => (
          <span key={index} style={{ color: '#D3D3D3', fontSize: '40px' }}>★</span>
        ))}
      </div>
    );
  };

  return (
    <div className="doctors-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search doctors by name, specialization, or location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="cards">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor, index) => (
            <div key={index} className={`card ${doctor.color}`}>
              <div className="profile-pic">
                <i className="ri-account-circle-fill"></i>
              </div>
              <h2>
                Dr. {doctor.baseUserId.firstname} {doctor.baseUserId.lastname}
              </h2>
              <p>
                <strong>Specialization:</strong> {doctor.specialization}
              </p>
              <p>
                <strong>Experience:</strong> {doctor.experience} years
              </p>
              <p>
                <strong>Fees per consultation:</strong> {doctor.fees} Rs
              </p>
              <p>
                <strong>Phone:</strong> {doctor.baseUserId.phoneNumber || 'N/A'}
              </p>
              <p>
                <strong>Age:</strong> {doctor.baseUserId.age}
              </p>
              <p>
                <strong>Gender:</strong> {doctor.baseUserId.gender}
              </p>
              <p>
                <strong>Location:</strong> {doctor.location || 'N/A'}
              </p>
              <p>
                <strong>{renderStars(doctor.averageRating || 0)}</strong> 
              </p>

              <Link
                to={`/AppointmentPatientSide/${doctor._id}`}
                state={doctor} // Pass doctor details as state
              >
                <button className="btn">Book Appointment</button>
              </Link>
            </div>
          ))
        ) : (
          <p>No doctors available</p>
        )}
      </div>
    </div>
  );
};

export default Cards;
