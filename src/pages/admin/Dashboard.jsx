import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import SideBar from '../../components/admin/SideBar';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../provider/authProvider';
import api from '../../utils/apiServices';



function Dashboard() {

  const navigate = useNavigate();
  const { token } = useAuth();
  

  const [analytics, setAnalytics] = useState([])

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