import React from 'react'
import Navbar from '../../components/Navbar'
import SideBar from '../../components/vendor/SideBar';
import { useNavigate } from "react-router-dom";
import apiServices from '../../utils/apiServices';
import { useEffect } from 'react';
import { useAuth } from '../../provider/authProvider';
import { useState } from 'react';
import TableOrders from '../../components/vendor/TableOrders';



const Orders = () => {

  const [orders, setOrders] = useState([])
  const navigate = useNavigate();
  const { token } = useAuth()

  useEffect(() => {
    const getOrders = async () => {
      const { data } = await apiServices.vendors.orders.getOrders({
        userAuthToken: token
      }).request
      setOrders(data)
    }
    getOrders()
  }, [])

  return (
    <div className='flex flex-col gap-2'>
      <Navbar />
      <div className='flex '>
        <SideBar page={"Orders"} />
        <div className='container mx-auto'>
          <TableOrders orders={orders} />
        </div>
      </div>
    </div>
  )
}

export default Orders