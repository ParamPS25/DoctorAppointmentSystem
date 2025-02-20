import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Predict_diabetes from "./Predict_diabetes";
import Predict_stroke from "./Predict_stroke";
  
import Predict_disease_using_symptoms from "./Predict_disease_using_symptoms";
import SymptomsPage from "./SymptomsPage";
import Sidenav from '../../components/Sidenav'; // Adjust the path as necessary


const Symptoms = () => {
  return (
    <>
    {/* <div className='w-[25%] h-full'>
    <Sidenav/>
    </div> */}
      <Routes>
        <Route path="/" element={<SymptomsPage />} />
        <Route path="/Predict_diabetes" element={<Predict_diabetes />} />
        <Route path="/Predict_stroke" element={<Predict_stroke />} />  
       
        <Route path="/Predict_disease_using_symptoms" element={<Predict_disease_using_symptoms />} />
      </Routes>
      </>
  );
};

export default Symptoms;
