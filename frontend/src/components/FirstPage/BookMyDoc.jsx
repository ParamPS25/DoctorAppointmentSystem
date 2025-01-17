import React from "react";
import "./BookMyDoc.css"; // Import a custom CSS file for styling

const BookMyDoc = () => {
  const features = [
    {
      title: "Book Appointments Effortlessly",
      description:
        "With BookMyDoc, users can book appointments online with just a few clicks. Choose your preferred doctor, date, and time for a seamless healthcare experience. Avoid long waiting times and ensure your slot is reserved in advance.",
      icon: "📅",
    },
    {
      title: "Symptom-Based Disease Prediction",
      description:
        "Enter or select 3-5 symptoms, and our advanced AI system analyzes them to predict possible diseases. Additionally, get focused predictions for conditions like diabetes and stroke to take timely actions and prepare for consultations.",
      icon: "🤖",
    },
    {
      title: "Doctor Verification & Confirmation",
      description:
        "Once your appointment is booked, the doctor reviews your request and confirms or rejects it. On confirmation, you’ll receive an email with a QR code that ensures a secure and streamlined check-in during your appointment.",
      icon: "✅",
    },
  ];

  return (
    <div className="bookmeet-container">
      <h2 className="section-title">Why Choose BookMyDoc</h2>
      <p className="section-subtitle">
        Your One-Stop Solution for Online Appointments and Health Insights
      </p>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div className="feature-card w-[25%]" key={index}>
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookMyDoc;
