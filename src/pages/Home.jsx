import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Navbar from '../components/Navbar'
import api from '../utils/apiServices';
import MatetoSvg from '../assets/mateto.svg'
import { Skeleton, Carousel } from "keep-react";
import { useAuth } from '../provider/authProvider';



const Home = props => {

  const [products, setProducts] = useState([])
  const [vendors, setVendors] = useState([])
  const { token } = useAuth();

  const fetchData = async () => {
    const productsData = await api.products.getProducts({
      userAuthToken: token,
    }).request
    setProducts(productsData.data)

    const vendorsData = await api.vendors.getVendors({
      userAuthToken: token,
    }).request
    setVendors(vendorsData.data)

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
      <div className="flex flex-col items-center justify-center w-full h-full bg-center bg-no-repeat bg-cover rounded-2xl" style={{ backgroundImage: `url(${item.imageUrls[0]})` }}>
        <div className="flex flex-col items-start justify-center w-full h-full px-20 bg-black bg-opacity-50 rounded-2xl">
          <h1 className=" text-white text-[78px] font-thin  leading-[93.62px] tracking-tight">{item.title}</h1>
          <div className="w-[250px] h-[45px] px-[50px] py-4 bg-white rounded-lg justify-center items-center gap-3 inline-flex">
            <div className="text-xl font-bold text-center text-neutral-700 font-inter">Compra ahora</div>
          </div>
        </div>
      </div>
    )
  }

  const CardPromotion = ({ item, title }) => {
    //Los textos deben estar sobre la imagen
    return (
      <div className="flex flex-col items-center justify-center w-full bg-center bg-no-repeat bg-cover h-96 rounded-2xl" style={{ backgroundImage: `url(${item.imageUrls[0]})` }}>
        <div className="flex flex-col items-start justify-between w-full h-full px-10 py-20 bg-black bg-opacity-50 rounded-2xl">
          <h1 className="text-3xl font-bold text-white">{title}</h1>
          <h4 className='font-thin text-white underline'>Explorar productos</h4>
        </div>
      </div>
    )
  }

  const CardNew = ({ item }) => {
    //Los textos deben estar sobre la imagen
    return (
      <div className="flex flex-col items-center justify-center bg-center bg-no-repeat bg-cover h-72 w-72 rounded-xl" style={{ backgroundImage: `url(${item.imageUrls[0]})` }}>
        <div className="flex flex-col items-center justify-center w-full h-full bg-black bg-opacity-50 rounded-xl">
          <h1 className="text-xl font-bold text-white">{item.title}</h1>
          <button className="px-4 py-2 mt-4 font-thin text-white underline ">Comprar</button>
        </div>
      </div>
    )
  }



  return (
    <div className='px-5 mx-auto md:px-0'>
      <Navbar />
      <div className='container mx-auto my-16'>
        {products?.length > 0 ? (
          <Carousel slide={true} indicatorsType="ring" indicators={true}>
            {products.slice(0, 4).map((item, index) => {
              return (
                <CardCarousel key={index} item={item} />
              )
            })}
          </Carousel>
        ) : (
          <SkeletonComponent />
        )}
      </div>

      <div className='container flex flex-col gap-5 mx-auto my-16 md:flex-row'>
        {
          products?.length > 0 ? <CardPromotion item={
            products.reduce((prev, current) => {
              return (prev.price > current.price) ? prev : current
            })
          } title={"Exclusivos"} /> : <SkeletonComponent />
        }
        {
          products?.length > 0 ? <CardPromotion item={
            products.reduce((prev, current) => {
              return (prev.price < current.price) ? prev : current
            })
          } title={"Precios accesibles"} /> : <SkeletonComponent />
        }
      </div>

      <div className='container flex flex-col gap-5 mx-auto my-16 '>
        <div className="w-[420px] h-8 justify-start items-start gap-5 inline-flex">
          <div className="w-1.5 h-[30px] bg-stone-800 rounded-[10px]" />
          <h4 className='text-xl md:text-3xl font-extralight'>Nuevos</h4>
        </div>

        <div className='container flex flex-col justify-between gap-5 mx-auto my-16 md:flex-row'>
          {products?.length > 0 ?
            products.slice(0, 4).map((item, index) => {
              return (
                <CardNew key={index} item={item} />
              )
            })
            :
            [1, 2, 3, 4].map((item, index) => {
              return (
                <SkeletonComponent key={index} />
              )
            })

          }

        </div>
      </div>

      <section className="container flex flex-col gap-5 mx-auto my-16 ">
        <div className="w-[420px] h-8 justify-start items-start gap-5 inline-flex">
          <div className="w-1.5 h-[30px] bg-stone-800 rounded-[10px]" />
          <h4 className='text-xl md:text-3xl font-extralight'>Nuestros vendedores</h4>
        </div>


        <div className="grid gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {
            vendors?.length > 0 ?
              [0, 1, 2, 3].map((item, index) => {
                return (
                  <div key={index} className="flex flex-col items-center justify-center w-full h-full ">
                    <div className="flex flex-col items-start justify-center w-full h-full">
                      <img className="object-cover object-center w-full h-48 mx-auto rounded-lg" src="https://images.unsplash.com/photo-1682688759350-050208b1211c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8" alt="avatar" />

                      <div className="mt-4">
                        <h1 className="text-xl font-semibold text-gray-800">{vendors[0]?.username}</h1>
                        <p className="mt-1 text-base font-medium text-gray-600">{vendors[0]?.email}</p>
                      </div>
                    </div>
                  </div>
                )
              })
              :
              [1, 2, 3, 4].map((item, index) => {
                return (
                  <div key={index} className="flex flex-col items-center justify-center w-full h-full bg-white rounded-lg shadow-lg">
                    <div className="flex flex-col items-center justify-center w-full h-full p-8">
                      <Skeleton.Line height="h-[150px]" />
                      <div className="mt-4">
                        <Skeleton.Line height="h-[30px]" />
                        <Skeleton.Line height="h-[20px]" />
                      </div>
                    </div>
                  </div>
                )
              })
          }
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
                <a href="/home" className="transition-colors duration-300 hover:underline">Home</a>
                <a href="/products" className="transition-colors duration-300 0 hover:underline ">Nuestros productos</a>
                <a href="/vendedores" className="transition-colors duration-300 hover:underline">Nuestros vendedores</a>
              </div>
            </div>

            <div>
              <p className="font-semibold ">Nosotros</p>

              <div className="flex flex-col items-start mt-5 space-y-2">
                <a href="#" className="transition-colors duration-300 hover:underline">Terminos y condiciones</a>
                <a href="#" className="transition-colors duration-300 hover:underline">Preguntas y respuestas</a>
                <a href="#" className="transition-colors duration-300 hover:underline">Contactanos</a>
              </div>
            </div>
          </div>

          <hr className="my-6 md:my-8 " />

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