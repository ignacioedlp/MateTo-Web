import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useAuth } from '../provider/authProvider'
import api from '../utils/apiServices';
import {  FcDislike } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { Player } from '@lottiefiles/react-lottie-player';
import FavoriteEmpty from '../assets/favoriteEmpty.svg'

const Favorite = () => {

  const [favorites, setFavorites] = useState(null)
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

  if (!favorites) return (
    <div className='container flex items-center justify-center h-screen mx-auto '>
      <div className='w-40 h-40'>
        <Player
          src="https://lottie.host/c347a01b-7544-489f-a889-bc6017eb6ea2/euwpGrghxm.json"
          className="player"
          loop
          autoplay
        />
      </div>
    </div>
  );


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
          <div className='flex flex-col items-center justify-center gap-4 p-64'>
            <img src={FavoriteEmpty} alt="Carrito vacio" className="object-cover rounded-lg" />
            <h3 className='text-[34px] font-thin'>
              Tu lista de deseos está vacía
            </h3>
            <span className='text-[16px] font-thin text-[#807D7E] w-3/4 text-balance text-center'>
            Aún no tienes ningún producto en la lista de deseos. 
            Encontrará muchos productos interesantes en nuestra página Tienda.
            </span>
            <button className='px-[48px] py-[12px] font-bold text-white bg-[#292526] rounded-lg' onClick={() => navigate('/products')}>
              <span className='font-bold text-[18px]'>Continuar comprando</span>
            </button>
          </div>
        )
      }
    </ >
  )
}

Favorite.propTypes = {}

export default Favorite