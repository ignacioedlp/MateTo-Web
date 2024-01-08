import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Navbar from '../components/Navbar'
import { useFavorites } from '../provider/favoriteProvider'
import axiosInstance from '../utils/apiServices'
import { FcLike, FcDislike } from "react-icons/fc";


const Favorite = props => {

  const { favorites, removeFavorite } = useFavorites()

  return (
    <div>
      <Navbar />
      {
        favorites?.length > 0 ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="flex flex-col items-center justify-center w-full h-full">
              <h1 className="text-4xl font-bold text-neutral-900">Tus favoritos</h1>
              <div className="flex flex-col items-center justify-center w-full h-full">
                <div className="container grid w-full grid-cols-3 gap-4 mx-auto">
                  {favorites?.map((p) => (
                    <div className=" w-[282px] h-[441px] ">
                      <div className="relative">
                        <img src={p.imageUrls[0]} alt="Producto 1" className="object-cover w-[282px] h-[370px] rounded-lg" />

                        <div className="absolute top-0 right-0 mt-4 mr-4">
                          <div className="w-[32.36px] h-[32.36px] bg-white rounded-full flex items-center justify-center" onClick={() => removeFavorite(p.id)}>
                            <FcDislike size={15} />
                          </div>
                        </div>
                      </div>

                      <div className='flex justify-between mt-3'>
                        <div className='flex flex-col gap-2'>
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
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="flex flex-col items-center justify-center w-full h-full">
              <h1 className="text-4xl font-bold text-neutral-900">Tus favoritos</h1>
              <div className="flex flex-col items-center justify-center w-full h-full">
                <h1 className="text-2xl font-bold text-neutral-900">No tienes favoritos</h1>
              </div>
            </div>
          </div>
        )
      }
    </div >
  )
}

Favorite.propTypes = {}

export default Favorite