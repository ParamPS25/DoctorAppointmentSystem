import React from 'react';
import Sidenav from './Sidenav';
import Content from './Content';
import { Link } from 'react-router';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const Home = () => {
  return (
    <>
    <Sidenav/>
<div className='w-[80%] h-full'>
    {/* <Content/> */}
</div>
</>
  )
};

export default Home;
