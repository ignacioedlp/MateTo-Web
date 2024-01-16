import React from 'react'
import Navbar from '../../components/Navbar'
import SideBar from '../../components/admin/SideBar';

function Dashboard() {

  return (
    <div className='flex flex-col gap-2'>
      <Navbar />
      <div className='flex '>
        <SideBar page={"Home"} />
        <div className='container flex flex-wrap justify-around mx-auto mt-10'>
        </div>
      </div>
    </div>
  )
}

export default Dashboard