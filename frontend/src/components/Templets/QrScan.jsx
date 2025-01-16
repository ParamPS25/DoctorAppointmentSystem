import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QrScanner from 'react-qr-scanner';
import axios from 'axios';

const QrScan = () => {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleScan = async (data) => {
    if (data) {
      try {
        // Parse the QR code data
        const qrData = JSON.parse(data.text);
        setResult(JSON.stringify(qrData, null, 2)); // Pretty print the scanned data

        const response = await axios.post(
          'http://localhost:8080/api/book/doctor-scan',
          qrData,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        // Handle the response correctly
        if (response.data.success) {
          alert('Appointment marked as completed successfully!');
          navigate('/Appointments');
        } else {
          setError(response.data.message || 'Failed to verify QR code');
          alert(response.data.message || 'Failed to verify QR code');
        }
      } catch (err) {
        console.error('Error verifying QR code:', err);
        const errorMessage = err.response?.data?.message || err.message || 'Error verifying QR code';
        setError(errorMessage);
        alert(errorMessage);
      }
    }
  };

  const handleError = (err) => {
    console.error('QR Scanner Error:', err);
    setError(err.message);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Scan Appointment QR Code</h1>
      
      <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md">
        <QrScanner
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        />
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          Error: {error}
        </div>
      )}
      
      {result && (
        <div className="mt-4 p-3 bg-gray-50 rounded-md">
          <h2 className="font-semibold mb-2">Scanned Data:</h2>
          <pre className="whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  );
};

export default QrScan;