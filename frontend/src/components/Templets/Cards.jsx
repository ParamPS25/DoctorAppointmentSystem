import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cards.css';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../reusables/LoadinSpinner';

const Cards = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const NODE_ENV = import.meta.env.VITE_NODE_DOC_API;
        const response = await axios.get(NODE_ENV+'/api/doctors/', {
          withCredentials: true,
        });
        if (response.data.message === 'success') {
          setDoctors(response.data.doctors);
          setFilteredDoctors(response.data.doctors);
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally{
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Debounce search term -> optimizes UI performance, reduces unnecessary computations and re-renders
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // Wait 500ms before updating debounced value

    return () => {
      clearTimeout(handler); // Clear timeout if user types again
    };
  }, [searchTerm]);

  // Search filtering based on name (firstname - lastname), specialization, and location
  useEffect(() => {
    const results = doctors.filter((doctor) => {
      return (
        `${doctor.baseUserId.firstname} ${doctor.baseUserId.lastname}`
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) 
        // || (doctor.location && doctor.location.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
      );
    });

    setFilteredDoctors(results);
  }, [debouncedSearchTerm, doctors]);

  // Function to render star ratings
  const renderStars = (rating, ratingCount) => {
      const validRating = rating % 5; // Rating is out of 5
      const totalStars = 5;
      const brightStars = Math.floor(validRating);
      const dullStars = totalStars - brightStars;
    
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div>
            {/* creates an empty array with a length equal to brightStars , spread operator (...) is used to convert the empty slots into undefined values.
                This makes the array iterable, turning [empty × 3] into [undefined, undefined, undefined] -> because .map() doesn't work on empty slots but does work on undefined values.
                The _ is a throwaway variable since we don’t need the actual value as its undefined (just the index).*/}
            {[...Array(brightStars)].map((_, index) => (
              <span key={index} style={{ color: '#FFD700', fontSize: '34px' }}>★</span>
            ))}
            {[...Array(dullStars)].map((_, index) => (
              <span key={index} style={{ color: '#D3D3D3', fontSize: '34px' }}>★</span>
            ))}
          </div>
          <span style={{ fontSize: '17px', fontWeight: 'bold' }}>{`(${ratingCount})`}</span>
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

      {isLoading ? (
        <LoadingSpinner /> // Show spinner while loading
      ) : (
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

                <p style={styles.locationInfo}>
                  <strong>Location: </strong>
                  {doctor?.location ? (
                      <>
                      {doctor.location.buildingInfo}, 
                      {doctor.location.streetName}, 
                      {doctor.location.cityName}, 
                      {doctor.location.stateName}.
                      </>
                  ) : (
                    <p>Location not specified</p>
                  )}
                </p>

                <p>
                  <strong>{renderStars(doctor.averageRating || 0 , doctor.ratingCount || 0)}</strong> 
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
      )}
    </div>
  );
};

const styles = {
  locationInfo: {
    // marginTop: '10px',
    // padding: '2px',
    backgroundColor: 'transparent',
  }
};

export default Cards;
