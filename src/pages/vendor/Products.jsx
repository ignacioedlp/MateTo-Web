import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import api from '../../utils/apiServices';
import { useSettings } from '../../provider/settingsProvider';
import TableProducts from '../../components/vendor/TableProducts';
import Navbar from '../../components/Navbar'
import { decodeToken } from "../../utils/jwt";
import { useAuth } from '../../provider/authProvider';
import SideBar from '../../components/vendor/SideBar';
import { Pagination } from "keep-react";




const Dashboard = () => {
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { token } = useAuth();
  const { settings } = useSettings();

  const fetchProducts = async () => {
    const response = await api.products.getProducts({
      userAuthToken: token,
      params: {
        vendor: decodeToken(token).id,
        pageSize: 1000,
        page: 1
      }
    }).request

    setProducts(response.data.products)
    setTotalPages(response.data.totalPages)
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
          <div className='flex justify-end w-full '>
            <Pagination
              currentPage={currentPage}
              onPageChange={(val) => setCurrentPage(val)}
              totalPages={totalPages}
              iconWithOutText
              prevNextShape="roundSquare"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

Dashboard.propTypes = {}

export default Dashboard