import React, { useState } from 'react';
import { LogOut, Calendar, Users, User } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const appointmentData = [
  { id: 1, patient: 'John Doe', Email: 'xyz@ab.in', date: '2025-02-16', Status: 'Pending' },
  { id: 2, patient: 'Jane Smith', Email: 'xyz@ab.in', date: '2025-02-17', Status: 'Pending' },
];

const initialDoctorData = [
  { id: 1, name: 'Dr. Alice', email: 'abc@Admin.in', specialty: 'Cardiology' },
  { id: 2, name: 'Dr. Bob', email: 'abc@Admin.in', specialty: 'Neurology' },
];

const patientData = [
  { id: 1, name: 'John Doe', age: 30, contact: '555-1234' },
  { id: 2, name: 'Jane Smith', age: 25, contact: '555-5678' },
];

const appointmentList = [
  { name: 'Mon', appointments: 4 },
  { name: 'Tue', appointments: 3 },
  { name: 'Wed', appointments: 6 },
  { name: 'Thu', appointments: 4 },
  { name: 'Fri', appointments: 8 },
  { name: 'Sat', appointments: 5 },
  { name: 'Sun', appointments: 2 },
];

const patientDistribution = [
  { name: 'General', value: 400 },
  { name: 'Pediatric', value: 300 },
  { name: 'Orthopedic', value: 200 },
  { name: 'Dental', value: 150 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Admin = () => {
  const [activeTab, setActiveTab] = useState('appointments');
  const [doctorData, setDoctorData] = useState(initialDoctorData);
  const [showAddDoctorForm, setShowAddDoctorForm] = useState(false);
  const [newDoctor, setNewDoctor] = useState({ name: '', email: '', specialty: '' });

  const handleAddDoctor = () => {
    setShowAddDoctorForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setDoctorData((prev) => [...prev, { ...newDoctor, id: prev.length + 1 }]);
    setShowAddDoctorForm(false);
    setNewDoctor({ name: '', email: '', specialty: '' });
  };

  return (
    <div>
      <div className='w-full h-16 bg-[#F8F8FF] flex justify-between shadow-md'>
        <div className='flex items-center h-full px-4'>
          <h1 className='font-bold text-xl'>BookMyDoc</h1>
        </div>
        <div className='flex items-center h-full px-4'>
          <button className='px-4 py-2 rounded-lg flex font-semibold'>
            <LogOut size={24} color='black' className='mr-1' />
            Logout
          </button>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='flex space-x-4 mb-8'>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'appointments'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Calendar className='w-5 h-5 mr-2' />
            Appointments
          </button>

          <button
            onClick={() => setActiveTab('doctors')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'doctors'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <User className='w-5 h-5 mr-2' />
            Doctors
          </button>

          <button
            onClick={() => setActiveTab('patients')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'patients'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Users className='w-5 h-5 mr-2' />
            Patients
          </button>
        </div>

        {/* Main Content Based on Active Tab */}
        {activeTab === 'appointments' && (
          <div>
            {/* Render appointments content */}
            <h2 className='text-2xl font-bold mb-4'>Appointments</h2>
            <div className='bg-white rounded-lg shadow-md p-6 w-[70%]'>
              <div>
                <div className='overflow-x-auto'>
                  <table className='min-w-full divide-y divide-gray-200'>
                    <thead>
                      <tr>
                        <th>Patient</th>
                        <th>E-mail</th>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200 text-center'>
                      {appointmentData.map((appointment) => (
                        <tr key={appointment.id}>
                          <td>{appointment.patient}</td>
                          <td>{appointment.Email}</td>
                          <td>{appointment.date}</td>
                          <td>{appointment.Status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {/* Weekly Appointments */}
              <div className='bg-white p-6 rounded-lg shadow-sm h-[400px] mt-12'>
                <h2 className='text-lg font-semibold mb-4'>Weekly Appointments</h2>
                <ResponsiveContainer width='100%' height='100%'>
                  <LineChart data={appointmentList}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type='monotone'
                      dataKey='appointments'
                      stroke='#8884d8'
                      strokeWidth={2}
                      dot={{ strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'doctors' && (
          <div className='w-[70%] '>
            {/* Render doctors content */}
            <div className='flex justify-between'>
              <h2 className='text-2xl font-bold mb-4'>Doctors</h2>
              <button
                className='w-32 h-9 rounded-lg bg-blue-500 ml-52 font-semibold mr-2'
                onClick={handleAddDoctor}
              >
                +Add
              </button>
            </div>
            {showAddDoctorForm && (
              <form onSubmit={handleFormSubmit} className='bg-white rounded-lg shadow-md p-6 mb-4'>
                <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                    Name
                  </label>
                  <input
                    type='text'
                    name='name'
                    value={newDoctor.name}
                    onChange={handleFormChange}
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    required
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                    Email
                  </label>
                  <input
                    type='email'
                    name='email'
                    value={newDoctor.email}
                    onChange={handleFormChange}
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    required
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='specialty'>
                    Specialty
                  </label>
                  <input
                    type='text'
                    name='specialty'
                    value={newDoctor.specialty}
                    onChange={handleFormChange}
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    required
                  />
                </div>
                <div className='flex items-center justify-between'>
                  <button
                    type='submit'
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  >
                    Add Doctor
                  </button>
                </div>
              </form>
            )}
            <div className='bg-white rounded-lg shadow-md p-6 w-full'>
              <div>
                <div className='overflow-x-auto'>
                  <table className='min-w-full divide-y divide-gray-200'>
                    <thead>
                      <tr>
                        <th>name</th>
                        <th>E-mail</th>
                        <th>specialization</th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200 text-center'>
                      {doctorData.map((doctor) => (
                        <tr key={doctor.id}>
                          <td>{doctor.name}</td>
                          <td>{doctor.email}</td>
                          <td>{doctor.specialty}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'patients' && (
          <div>
            {/* Render patients content */}
            <h2 className='text-2xl font-bold mb-4'>Patients</h2>
            <div className='bg-white rounded-lg shadow-md p-6 w-[70%]'>
              <div>
                <div className='overflow-x-auto'>
                  <table className='min-w-full divide-y divide-gray-200'>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Contact</th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200 text-center'>
                      {patientData.map((patient) => (
                        <tr key={patient.id}>
                          <td>{patient.name}</td>
                          <td>{patient.age}</td>
                          <td>{patient.contact}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm h-[400px] mt-12">
              <h2 className="text-lg font-semibold mb-4">Patient Distribution by Department</h2>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={patientDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {patientDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;