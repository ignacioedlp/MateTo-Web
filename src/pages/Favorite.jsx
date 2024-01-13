import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Navbar from '../components/Navbar'
import { useAuth } from '../provider/authProvider'
import api from '../utils/apiServices';
import { FcLike, FcDislike } from "react-icons/fc";
import { Spinner } from "keep-react";
import { useNavigate } from "react-router-dom";


const Favorite = props => {

  const [favorites, setFavorites] = useState([])
  const { token } = useAuth()
  const navigate = useNavigate();



  useEffect(() => {
    const getFavorites = async () => {
      const { data } = await api.user.favorites.getFavorites({
        userAuthToken: token,
      }).request
      setFavorites(data)
    }
    getFavorites()
  }, []);

  const removeFavorite = async (id) => {
    const { data } = await api.user.favorites.deleteFromFavorites({
      userAuthToken: token,
      productId: id,
    }).request
    setFavorites(data)
  }


  return (
    <>
      <Navbar />
      {
        favorites?.length > 0 ? (
          <div className="flex flex-col items-center justify-center w-full h-full mt-10">
            <div className="flex flex-col items-center justify-center w-full h-full gap-10">
              <h1 className="text-4xl font-bold text-neutral-900">Tus favoritos</h1>
              <div className="flex flex-col items-center justify-center w-full h-full ">
                <div className="container flex flex-wrap justify-around w-full gap-4 mx-auto ">
                  {favorites?.map((p) => (
                    <div className=" w-[282px] h-[441px] " key={p.id}>
                      <div className="relative">
                        <img src={p.imageUrls[0]} alt="Producto 1" className="object-cover w-[282px] h-[370px] rounded-lg" />

                        <div className="absolute top-0 right-0 mt-4 mr-4">
                          <div className="w-[32.36px] h-[32.36px] bg-white rounded-full flex items-center justify-center cursor-pointer" onClick={() => removeFavorite(p.id)}>
                            <FcDislike size={15} />
                          </div>
                        </div>
                      </div>

                      <div className='flex justify-between mt-3'>
                        <div className='flex flex-col gap-2 cursor-pointer' onClick={() => navigate(`/products/${p.id}`)}>
                          <h3 className="text-base font-semibold ">{p.title}</h3>
                        </div>
                        <div className="w-[82.31px] h-[36.58px] bg-neutral-100 rounded-lg flex items-center justify-center" >
                          <div className="text-sm font-bold text-center text-neutral-700 font-inter">$ {p.price}</div>
                        </div>
                      </div>
                    </div>
                  ))
                  }</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="container flex flex-col items-center justify-center w-full h-full mx-auto my-20">
            <Spinner color="gray" size="lg" />;
          </div>
        )
      }
    </ >
  )
}

Favorite.propTypes = {}

export default Favorite