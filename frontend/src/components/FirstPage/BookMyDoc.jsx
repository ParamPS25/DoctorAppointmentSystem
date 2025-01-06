import React from "react";
import "./BookMyDoc.css"; // Import a custom CSS file for styling

const BookMyDoc = () => {
  const features = [
    {
      title: "SIMPLIFIES SCHEDULING",
      description:
        "With BOOKMYDOC, scheduling occurs in one well-organised platform so the endless back-and-forth communication can be avoided and a streamlined communication is guaranteed. Manage multiple locations or employees, only show your clients the calendar you want them to see, and block out any dates you will be taking off from work. Manage Clinic effortlessly with our powerful interface for phone-in, walk-in and online requests.",
      icon: "🌍", 
    },
    {
      title: "POWERFUL.PERSONAL.",
      description:
        "BOOKMYDOC offers a wide selection of online solutions that simplify the process of scheduling appointments (clinic and eConsultation) that doesn't require registration. Send automatic and manual reminders, see who is missing at first sight. No switching between calendar and BOOKMYDOC. Avoid booking conflicts. Automatically sync appointments and procedure scheduling on our powerful interface access on mobile.",
      icon: "📅",
    },
    {
      title: "BOOKMYDOC QMM-TOKEN",
      description:
        "Improve outpatient (OP) flow at Hospitals & clinics with BOOKMYDOC's QMM (Queue Management Module). Seamless queue management that works with online appointments, clinic phone-in appointments & walk-in appointments. SMS notification and reminder to maintain the patient flow in consultation with Unique Token ID. Intimating patients by SMS and email reminders to avoid missing booked confirmed appointments effortlessly.",
      icon: "📨",
    },
  ];

  return (
    <div className="bookmeet-container">
      <h2 className="section-title">WHY CHOOSE BOOKMYDOC</h2>
      <p className="section-subtitle">
        Online Appointment, Phone-in Appointment, Walk-in Appointment with Token
      </p>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
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