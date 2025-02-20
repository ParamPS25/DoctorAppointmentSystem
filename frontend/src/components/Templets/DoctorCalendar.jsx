import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";
import './DoctorCalendar.css';

const DoctorCalendar = () => {
  const [appointments, setAppointments] = useState({});
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Fetch appointments
  const fetchAppointments = async (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 0-based to 1-based month
    
    try {
      const NODE_ENV = import.meta.env.VITE_NODE_DOC_API;
      const response = await fetch(
        `${NODE_ENV}/api/book/calendar-appointments?year=${year}&month=${month}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        }
      );
      const data = await response.json();
      if (data.success) {
        setAppointments(data.calendarData);
      }
    } catch (err) {
      console.error('Error fetching appointments:', err);
    }
  };

  // Handle month navigation
  const handleMonthChange = (date) => {
    setCurrentMonth(date);
    fetchAppointments(date);
  };

  useEffect(() => {
    fetchAppointments(currentMonth);
  }, []); // Only fetch on component mount

  const getTileClassName = ({ date }) => {
    // Only process dates in the current month
    if (date.getMonth() !== currentMonth.getMonth()) {
      return '';
    }

    const day = date.getDate();
    const statuses = appointments[day];
    
    if (!statuses || statuses.length === 0) {
      return '';
    }

    // Determine the most important status for the day
    const statusPriority = {
      'pending': 1,
      'confirmed': 2,
      'completed': 3,
      'cancelled': 4
    };

    const highestPriorityStatus = statuses.reduce((prev, current) => {
      return statusPriority[current] < statusPriority[prev] ? current : prev;
    }, statuses[0]);

    return highestPriorityStatus;
  };

  return (
    <div className="h-full w-full p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Doctor's Calendar</h2>
        <Calendar 
          onChange={setCalendarDate}
          value={calendarDate}
          onActiveStartDateChange={({ activeStartDate }) => handleMonthChange(activeStartDate)}
          tileClassName={getTileClassName}
          className="w-full h-full"
        />
        <div className="mt-4 flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-200 rounded"></div>
            <span>Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-200 rounded"></div>
            <span>Confirmed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-200 rounded"></div>
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-200 rounded"></div>
            <span>Cancelled</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCalendar;