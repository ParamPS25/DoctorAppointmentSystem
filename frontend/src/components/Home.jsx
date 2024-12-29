import React from 'react';
import Sidenav from './Sidenav';
import Content from './Content';
const Home = () => {
  return (
    <>
    <Sidenav/>
<div className='w-[80%] h-full'>
    <Content/>
</div>
</>
  )
};

export default Home;
