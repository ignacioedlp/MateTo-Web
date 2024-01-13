import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import SideBar from '../../components/admin/SideBar';
import { useNavigate } from "react-router-dom";
import { Statistic } from "keep-react";
import { useAuth } from '../../provider/authProvider';
import api from '../../utils/apiServices';
import TableUsers from '../../components/admin/TableUsers';



function Users() {

  const navigate = useNavigate();
  const { token } = useAuth();

  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await api.user.getAllUsers({
        userAuthToken: token
      }).request
      setUsers(data)
    }
    getUsers()
  }, [])

  return (
    <div className='flex flex-col gap-2'>
      <Navbar />
      <div className='flex '>
        <SideBar page={"Users"} />
        <div className='container flex justify-center w-full mx-auto'>
          <TableUsers users={users} />
        </div>
      </div>
    </div>
  )
}

export default Users