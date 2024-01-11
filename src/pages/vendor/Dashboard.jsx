import React from 'react'
import Navbar from '../../components/Navbar'
import SideBar from '../../components/vendor/SideBar';
import { useNavigate } from "react-router-dom";



function Dashboard() {

  const navigate = useNavigate();

  return (
    <div className='flex flex-col  '>
      <Navbar />
      <SideBar page={"home"}/>
    </div>
  )
}

export default Dashboard