import React, { useState, useEffect } from 'react'
import { Sidebar } from "keep-react";
import {
  ShoppingBagOpen,
  User,
} from "phosphor-react";
import Navbar from '../../components/Navbar'
import { HiOutlineLogout } from "react-icons/hi";
import { useAuth } from '../../provider/authProvider'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import apiServices from '../../utils/apiServices';
import TablePurchases from '../../components/TablePurchases';



const Purchases = () => {

  const { token, clearAuth } = useAuth();
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState([])

  const handleLogout = () => {
    delete axios.defaults.headers.common["Authorization"];
    clearAuth();
    navigate('/login');
  }

  useEffect(() => {
    const getPurchases = async () => {
      const response = await apiServices.purchases.getAllPurchasesOfOneUser({
        userAuthToken: token,
      }).request
      setPurchases(response.data);
    }

    getPurchases();
  }, [])

  return (
    <div className='flex flex-col gap-2'>
      <Navbar />
      <div className='flex'>
        <Sidebar aria-label="Sidebar with multi-level dropdown example" className='w-[200px]'>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/profile" icon={<User size={24} />}>
              Mi informacion
            </Sidebar.Item>
            <Sidebar.Item href="/purchases" icon={<ShoppingBagOpen size={24} />}>
              Compras
            </Sidebar.Item>
            <Sidebar.Item onClick={() => handleLogout()} icon={<HiOutlineLogout size={24} />}>
              Cerrar sesion
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar>
        <div className='container mx-auto'>
          <TablePurchases purchases={purchases} />
        </div>
      </div>
    </div>
  )
}

Purchases.propTypes = {}

export default Purchases