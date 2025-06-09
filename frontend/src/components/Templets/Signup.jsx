import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../reusables/LoadinSpinner';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    phoneNumber: '',
    age: '',
    gender: '',
    role: '',
    specialization: '',
    experience: '',
    fees: '',
    medicalHistory: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // For navigation

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedValue = value;
    let errorMsg = "";

    if (name === "phoneNumber") {
      updatedValue = value.replace(/\D/g, "");
      if (updatedValue.length > 10) return;
    }

    if (name === "firstname" || name === "lastname") {
      const nameRegex = /^[A-Za-z]{0,20}$/;
      if (!nameRegex.test(updatedValue)) {
        errorMsg = `${name === "firstname" ? "First" : "Last"} name must contain only letters (no spaces or special characters), and be max 20 characters`;
      }
    }

    if (name === "age") {
      // Sanitize the input: remove all non-digit characters
      const digitsOnly = value.replace(/\D/g, "");

      // Prevent more than 2 digits
      if (digitsOnly.length > 2) return;

      updatedValue = digitsOnly;

      const ageNum = parseInt(digitsOnly, 10);

      // Show error only if not empty and invalid
      if (digitsOnly && (isNaN(ageNum) || ageNum < 1 || ageNum > 99)) {
        errorMsg = "Age must be a number between 1 and 99";
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasFieldErrors = Object.values(errors).some((msg) => msg);
    if (hasFieldErrors) return;

    setIsLoading(true);

    try {
      const NODE_ENV = import.meta.env.VITE_NODE_DOC_API;
      const response = await fetch(NODE_ENV + '/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success === false && data.message === 'User already exists') {
        setErrors({ submit: 'User already exists' });
        setIsLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      console.log('Signup successful');

      if (data.user.role === "doctor") {
        navigate('/AllPage/Appointments');
      } else {
        navigate('/AllPage/Doctor');
      }

    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="h-full w-full py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold text-[#0077b6]">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="h-[50%] bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 shadow-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Basic Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                {errors.firstname && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>
                )}


              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                {errors.lastname && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                maxLength="10"
                pattern="[0-9]{10}"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Select role</option>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>

            {/* Doctor-specific fields */}
            {formData.role === 'doctor' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Specialization
                  </label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Experience (years)
                  </label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Consultation Fees
                  </label>
                  <input
                    type="number"
                    name="fees"
                    value={formData.fees}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            )}

            {errors.submit && (
              <div className="text-red-600 text-sm">{errors.submit}</div>
            )}

            <div>
              {isLoading ? (
                <LoadingSpinner small={true} />
              ) : (
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign up
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;