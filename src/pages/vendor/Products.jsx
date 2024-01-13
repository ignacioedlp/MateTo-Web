import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import api from '../../utils/apiServices';
import { useSettings } from '../../provider/settingsProvider';
import TableProducts from '../../components/vendor/TableProducts';
import Navbar from '../../components/Navbar'
import { decodeToken } from "../../utils/jwt";
import { useAuth } from '../../provider/authProvider';
import SideBar from '../../components/vendor/SideBar';





const Dashboard = () => {
  const [products, setProducts] = useState([])
  const { token } = useAuth();
  const { settings } = useSettings();

  const fetchProducts = async () => {
    const response = await api.products.getProducts({
      userAuthToken: token,
      params: {
        vendor: decodeToken(token).id
      }
    }).request

    setProducts(response.data)
  };

  const updateProduct = async (id, data) => {
    const response = await api.products.updateProduct({
      userAuthToken: token,
      id,
      data
    }).request

    fetchProducts()
  }

  const deleteProduct = async (id) => {
    const response = await api.products.deleteProduct({
      userAuthToken: token,
      id
    }).request

    fetchProducts()
  }

  const createProduct = async (data) => {
    console.log(data);
    const response = await api.products.createProduct({
      userAuthToken: token,
      data
    }).request

    fetchProducts()
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (

    <div className='flex flex-col gap-2'>
      <Navbar />
      <div className='flex '>
        <SideBar page={"Products"} />
        <div className='container mx-auto'>
          <TableProducts products={products} handleUpdateProduct={updateProduct} handleDeleteProduct={deleteProduct} handleCreateProduct={createProduct} settings={settings} />
        </div>
      </div>
    </div>
  )
}

Dashboard.propTypes = {}

export default Dashboard