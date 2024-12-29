import React from 'react'

const Cards = () => {
  const obj=[ {name:'Dr.abc',email:'abcd789@xyz.co',description:'Dr.Shantilal is well Known and exprinced doctor.he is specielist of Auyrvedik medicins',image:'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'},
    {name:'Dr.xyz',email:'abcd789@xyz.co',description:'Dr.Shantilal is well Known and exprinced doctor.he is specielist of Auyrvedik medicins',image:'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'},
    {name:'Dr.pqr',email:'abcd789@xyz.co',description:'Dr.Shantilal is well Known and exprinced doctor.he is specielist of Auyrvedik medicins',image:'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'},
    {name:'Dr.john',email:'abcd789@xyz.co',description:'Dr.Shantilal is well Known and exprinced doctor.he is specielist of Auyrvedik medicins',image:'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'},
    {name:'Dr.bean',email:'abcd789@xyz.co',description:'Dr.Shantilal is well Known and exprinced doctor.he is specielist of Auyrvedik medicins',image:'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'},
    {name:'Dr.nik',email:'abcd789@xyz.co',description:'Dr.Shantilal is well Known and exprinced doctor.he is specielist of Auyrvedik medicins',image:'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'}
  ];
  return (
    <div className='w-full h-[70%] flex items-center justify-center flex-wrap '> 
     {obj.map((item,index)=>(
  <div key={index} className={`${index %2===0 ? 'bg-gradient-to-r from-[#cad2c5] to-[#2c7da0]':'bg-gradient-to-r from-[#2c7da0] to-[#cad3c5]'} m-2 p-3 rounded-lg hover:drop-shadow-2xl`}>
  <div className='flex  items-center justify-center flex-col'>
 <img src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg' className='w-20 h-20 rounded-full' alt='doctor'/>
    <h1 className='text-2xl font-bold'>{item.name}</h1>
    <p className='text-sm '>ShantilsjdjdjalDr@xyz.co</p>
    <h3 className='mt-2 font-semibold'>Description</h3>
    <h4 className='text-xs font-semibold'>Dr.Shantilal is well Known and exprinced doctor.he is specielist of Auyrvedik medicins</h4>
  </div>
  </div>
     )
    )}
   </div>
  )
}

export default Cards
