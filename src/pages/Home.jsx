import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Navbar from '../components/Navbar'
import { Carousel } from "keep-react";
import axiosInstance from '../utils/apiServices';
import MatetoSvg from '../assets/mateto.svg'
import { Skeleton } from "keep-react";



const Home = props => {

  const [products, setProducts] = useState([])

  const fetchData = async () => {
    const response = await axiosInstance.get('/products')
    setProducts(response.data)
  }

  useEffect(() => {
    fetchData()
  }, []);

  const SkeletonComponent = () => {
    return (
      <div className="flex flex-col items-center justify-center w-full h-96">
        <Skeleton animation={true}>
          <div className="w-full">
            <Skeleton.Line height="h-[350px]" />
          </div>
        </Skeleton>
      </div>
    );
  }


  const CardCarousel = ({ item }) => {
    //Los textos deben estar sobre la imagen
    return (
      <div className="flex flex-col items-center justify-center w-full h-96 bg-cover bg-center bg-no-repeat rounded-none" style={{ backgroundImage: `url(${item.imageUrls[0]})` }}>
        <div className="flex flex-col items-center justify-center w-full h-full bg-black bg-opacity-50 rounded-none">
          <h1 className="text-3xl font-bold text-white">{item.title}</h1>
          <p className="text-white">{item.description}</p>
          <button className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600">Ver más</button>
        </div>
      </div>
    )
  }

  const CardPromotion = ({ item }) => {
    //Los textos deben estar sobre la imagen
    return (
      <div className="flex flex-col items-center justify-center w-full h-96 bg-cover bg-center bg-no-repeat rounded-2xl" style={{ backgroundImage: `url(${item.imageUrls[0]})` }}>
        <div className="flex flex-col items-center justify-center w-full h-full bg-black bg-opacity-50 rounded-3xl">
          <h1 className="text-3xl font-bold text-white">{item.title}</h1>
          <p className="text-white">{item.description}</p>
          <button className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600">Ver más</button>
        </div>
      </div>
    )
  }



  return (
    <div className='px-5 md:px-0'>
      <Navbar />
      <div className='w-full mb-16'>
        {products.length > 0 ? (
          <Carousel slideInterval={5000} showControls={true} indicators={true}>
            {
              products.map((product, index) => (
                <CardCarousel item={product} />
              ))
            }
          </Carousel>
        ) : (
          <SkeletonComponent />
        )}
      </div>

      <div className='flex mx-auto my-16 container gap-5 flex-col md:flex-row'>
        {products.length > 0 ? <CardPromotion item={products[0]} /> : <SkeletonComponent />}
        {products.length > 0 ? <CardPromotion item={products[0]} /> : <SkeletonComponent />}
      </div>
     <div className='flex mx-auto my-16 container gap-5 flex-col '>
        <h4 className='text-xl md:text-3xl font-extralight'>Nuevos</h4>
        <div className='flex mx-auto my-16 container gap-5 flex-col md:flex-row'>
          {products.length > 0 ? <CardPromotion item={products[0]} /> : <SkeletonComponent />}
          {products.length > 0 ? <CardPromotion item={products[0]} /> : <SkeletonComponent />}
          {products.length > 0 ? <CardPromotion item={products[0]} /> : <SkeletonComponent />}
          {products.length > 0 ? <CardPromotion item={products[0]} /> : <SkeletonComponent />}
        </div>
      </div> 

      <section className="flex mx-auto my-16 container gap-5 flex-col ">

        <h2 className="text-2xl font-semibold text-center capitalize lg:text-3xl ">Nuestros vendedores</h2>

        <div className="grid gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div className="w-full max-w-xs text-center">
            <img className="object-cover object-center w-full h-48 mx-auto rounded-lg" src="https://images.unsplash.com/photo-1493863641943-9b68992a8d07?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=739&q=80" alt="avatar" />

            <div className="mt-2">
              <h3 className="text-lg font-medium ">Mateando</h3>
            </div>
          </div>

          <div className="w-full max-w-xs text-center">
            <img className="object-cover object-center w-full h-48 mx-auto rounded-lg" src="https://images.unsplash.com/photo-1516756587022-7891ad56a8cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="avatar" />

            <div className="mt-2">
              <h3 className="text-lg font-medium ">Vidamatera</h3>
            </div>
          </div>

          <div className="w-full max-w-xs text-center">
            <img className="object-cover object-center w-full h-48 mx-auto rounded-lg" src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80" alt="avatar" />

            <div className="mt-2">
              <h3 className="text-lg font-medium ">MisYerbas</h3>
            </div>
          </div>

          <div className="w-full max-w-xs text-center">
            <img className="object-cover object-center w-full h-48 mx-auto rounded-lg" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="avatar" />

            <div className="mt-2">
              <h3 className="text-lg font-medium ">Praderas</h3>
            </div>
          </div>
        </div>

      </section>

      <footer className="">
        <div className="container px-6 py-12 mx-auto">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
            <div className="sm:col-span-2">
              <h1 className="max-w-lg text-xl font-semibold tracking-tight xl:text-2xl ">Subscribite a nuestras promociones y noticias.</h1>

              <div className="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
                <input id="email" type="text" className="px-4 py-2 border rounded-s-md focus:outline-none focus:ring focus:ring-opacity-40 " placeholder="Email Address" />

                <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wider  transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none  rounded-lg focus:ring focus:ring-opacity-80 bg-black text-white">
                  Enviar
                </button>
              </div>
            </div>

            <div>
              <p className="font-semibold ">Enlace rapido</p>

              <div className="flex flex-col items-start mt-5 space-y-2">
                <a href="/home" className=" transition-colors duration-300 hover:underline ">Home</a>
                <a href="/products" className="0 transition-colors duration-300 hover:underline ">Nuestros productos</a>
                <a href="/vendedores" className=" transition-colors duration-300  hover:underline ">Nuestros vendedores</a>
              </div>
            </div>

            <div>
              <p className="font-semibold ">Nosotros</p>

              <div className="flex flex-col items-start mt-5 space-y-2">
                <a href="#" className=" transition-colors duration-300 hover:underline ">Terminos y condiciones</a>
                <a href="#" className=" transition-colors duration-300 hover:underline ">Preguntas y respuestas</a>
                <a href="#" className=" transition-colors duration-300 hover:underline ">Contactanos</a>
              </div>
            </div>
          </div>

          <hr className="my-6  md:my-8 " />

          <div className="flex items-center justify-between">
            <a href="#">
              <img src={MatetoSvg} />
            </a>

          </div>
        </div>
      </footer>
    </div>
  )
}

Home.propTypes = {}

export default Home