import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import SideBar from '../../components/vendor/SideBar';
import { useNavigate } from "react-router-dom";
import { Statistic } from "keep-react";
import { Grid } from "@tremor/react";
import { MdAnalytics } from 'react-icons/md';
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

          {analytics?.cards?.map((item) => (
            <Statistic>
              <Statistic.Title>Members</Statistic.Title>
              <Statistic.Amount>{7381237}</Statistic.Amount>
            </Statistic>
          ))}

        </div>
      </div>
    </div>
  )
}

export default Dashboard