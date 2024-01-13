import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import SideBar from '../../components/admin/SideBar';
import { useNavigate } from "react-router-dom";
import { Statistic } from "keep-react";
import { useAuth } from '../../provider/authProvider';
import api from '../../utils/apiServices';
import TableVendors from '../../components/admin/TableVendors';



function Vendors() {

  const navigate = useNavigate();
  const { token } = useAuth();


  const [vendors, setVendors] = useState([])

  useEffect(() => {
    const getVendors = async () => {
      const { data } = await api.vendors.getAllVendors({
        userAuthToken: token
      }).request
      setVendors(data)
    }
    getVendors()
  }, [])

  return (
    <div className='flex flex-col gap-2'>
      <Navbar />
      <div className='flex '>
        <SideBar page={"Customers"} />
        <div className='container flex justify-center w-full mx-auto'>
          <TableVendors vendors={vendors} />
        </div>
      </div>
    </div>
  )
}

export default Vendors