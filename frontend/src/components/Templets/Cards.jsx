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
        const response = await axios.get('http://localhost:8080/api/doctors/',{
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

  // search filtering based on name (firstname - lastname) and specialization
  useEffect(() => {
    const results = doctors.filter((doctor) => {
      return (
        `${doctor.baseUserId.firstname} ${doctor.baseUserId.lastname}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    setFilteredDoctors(results);
  }, [searchTerm, doctors]);

  return (
    <div className="doctors-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search doctors by name or specialization"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="cards">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor, index) => (
            <div key={index} className={`card ${doctor.color}`}>
              <div className="profile-pic"><i className="ri-account-circle-fill"></i></div>
              <h2>Dr. {doctor.baseUserId.firstname} {doctor.baseUserId.lastname}</h2>
              <p><strong>Specialization:</strong> {doctor.specialization}</p>
              <p><strong>Experience:</strong> {doctor.experience} years</p>
              <p><strong>Fees per consultation:</strong> {doctor.fees} Rs</p>
              <p><strong>Phone:</strong> {doctor.baseUserId.phoneNumber || "N/A"}</p>
              <p><strong>Age:</strong> {doctor.baseUserId.age}</p>
              <p><strong>Gender:</strong> {doctor.baseUserId.gender}</p>

              <Link to={`/AppointmentPatientSide/${doctor._id}`}>
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