import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/apiServices';
import { useAuth } from '../provider/authProvider';
import Navbar from '../components/Navbar'
import { LuShoppingCart } from "react-icons/lu";
import { IoIosArrowRoundForward } from "react-icons/io";
import { CiDeliveryTruck, CiCreditCard1 } from "react-icons/ci";
import { RxSize } from "react-icons/rx";
import { Tabs } from "keep-react";
import apiServices from '../utils/apiServices';
import { FcLike } from "react-icons/fc";
import { Player } from '@lottiefiles/react-lottie-player';


const Product = () => {
  const [product, setProduct] = useState(null);
  const [otherProducts, setOtherProducts] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();


  const submitComment = async () => {
    try {
      apiServices.comments.createComment({
        userAuthToken: token,
        data: {
          text: comment,
          productId: id,
        },
      });
    } catch (error) {
      console.error("Error al crear el comentario:", error);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.products.getProduct({
          id,
          userAuthToken: token,
        }).request
        setProduct(response.data);
        setSelectedPhoto(response.data.imageUrls[0]);

        fetchOthersProductsOfThisVendor(response.data.author.id);
      } catch (error) {
        console.error('Error al obtener los datos del producto:', error);
      }
    };

    const fetchOthersProductsOfThisVendor = async (vendor) => {
      try {
        if (vendor) {
          const response = await api.products.getProducts({
            userAuthToken: token,
            params: {
              vendor: vendor,
              pageSize: 8,
              page: 1
            },
          }).request
          setOtherProducts(response.data.products);
        }
      } catch (error) {
        console.error('Error al obtener los datos del producto:', error);
      }
    }

    fetchProduct();
  }, [id]); // Dependencia para que se ejecute el useEffect cuando cambie el id


  const addCart = async (id) => {
    try {
      await api.user.cart.addToCart({
        userAuthToken: token,
        data: {
          productId: id,
          quantity: 1
        },
      }).request

    } catch (error) {
      console.error('Error al agregar al carrito:', error);
    }
  }

  const addToFavorites = async (id) => {
    await api.user.favorites.addToFavorites({
      userAuthToken: token,
      productId: id,
    }).request
  }


  if (!product) return (
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
    <div className='flex flex-col w-full'>
      <Navbar />
      <section className="container mx-auto overflow-hidden text-gray-600 body-font ">
        <div className="px-5 py-24 ">
          <div className="flex justify-center w-full gap-4">
            <div className='flex flex-col justify-center gap-4'>
              {
                product.imageUrls?.map((image, index) => (
                  <div className={`w-17 h-17 rounded-xl ${selectedPhoto === image && "border-[1px] border-black"}`} onClick={() => setSelectedPhoto(image)} key={index}>
                    <img src={image} alt="" className={`object-cover w-16 h-16 rounded-xl ${selectedPhoto === image && "border-2 border-white"}`} />
                  </div>
                ))
              }
            </div>
            <img alt="ecommerce" className="lg:w-[520px] w-full lg:h-[785px] h-[785px] object-fill object-center" src={selectedPhoto} />

            <div className="lg:w-[534px] w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm tracking-widest text-gray-500 title-font">{product.author.name}</h2>
              <h1 className="mb-1 text-3xl font-medium text-gray-900 title-font">{product.title}</h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-amber-300" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-amber-300" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-amber-300" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-amber-300" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-amber-300" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="ml-3 text-gray-600">{product.ratings.length} Reviews</span>
                </span>
                <span className="flex py-2 pl-3 ml-3 border-l-2 border-gray-200 space-x-2s">
                  {product.comments.length} <span className="ml-3 text-gray-600">Comentarios</span>
                </span>
              </div>
              <p className="leading-relaxed">{product.description}</p>
              <div className="flex flex-col items-start gap-3">
                <div className='flex gap-5'>
                  <span className="mr-3">Selecciona el tamaño</span>
                  <div className='flex items-center justify-center gap-1'>
                    <span>Tamaños en cm </span>

                    <IoIosArrowRoundForward size={20} />

                  </div>
                </div>
                <div className="flex gap-4">
                  {
                    product.sizes?.map((size, index) => (
                      <div
                        className={"flex items-center justify-center w-8 h-8 rounded-xl opacity-80 cursor-pointer  border border-[#8A8989]"}
                        key={index}
                      >
                        <p className={`text-[14px] font-semibold text-center text-[#8A8989] font-inter `}>{size.name}</p>
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className="flex flex-col items-start gap-4 pb-5 mt-6 mb-5">
                <span className="mr-3">Colores disponibles</span>
                <div className="flex gap-4">
                  {
                    product.colors?.map((color, index) => (
                      <button className={`border-2 rounded-full w-6 h-6 focus:outline-none`} style={
                        { backgroundColor: color.hex }
                      }
                        key={index}
                      ></button>
                    ))
                  }
                </div>
              </div>
              <div className="w-96 h-11 justify-start items-start gap-3.5 flex border-b-2 border-gray-100 mb-8">
                <button className="flex items-center justify-center gap-4 px-10 py-3 rounded-lg cursor-pointer bg-stone-800" onClick={() => addCart(product.id)}>,
                  <LuShoppingCart className="w-5 h-5 text-white " color="white" />
                  <div className="text-lg font-semibold text-center text-white font-inter">Agregar</div>
                </button>
                <div className="flex items-center justify-center gap-3 px-10 py-3 border rounded-lg border-neutral-700">
                  <div className="text-lg font-bold text-center text-neutral-700 font-inter">${product.price}</div>
                </div>
              </div>
              <div className='flex flex-wrap gap-4'>
                <div className="w-56 h-12 pr-12 pb-1.5 justify-start items-center gap-3.5 inline-flex">
                  <div className="relative flex flex-col items-start justify-start w-11 h-11">
                    <div className="flex items-center justify-center rounded-full w-11 h-11 bg-neutral-100" >
                      <CiCreditCard1 className="w-5 h-5 text-neutral-700 " />
                    </div>
                  </div>
                  <div className="text-lg font-medium text-neutral-700 font-inter">Pago seguro</div>
                </div>
                <div className="w-56 h-min pr-12 pb-1.5 justify-start items-center gap-3.5 inline-flex">
                  <div className="relative flex flex-col items-start justify-start w-11 h-11">
                    <div className="flex items-center justify-center rounded-full w-11 h-11 bg-neutral-100" >
                      <CiDeliveryTruck className="w-5 h-5 text-neutral-700 " />
                    </div>
                  </div>
                  <div className="text-lg font-medium text-neutral-700 font-inter">Envio gratis</div>
                </div>
                <div className="w-full h-min pr-12 pb-1.5 justify-start items-center gap-3.5 inline-flex">
                  <div className="relative flex flex-col items-start justify-start w-11 h-11">
                    <div className="flex items-center justify-center rounded-full w-11 h-11 bg-neutral-100" >
                      <RxSize className="w-5 h-5 text-neutral-700 " />
                    </div>
                  </div>
                  <div className="text-lg font-medium text-neutral-700 font-inter">Tamaño deseado</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >
      <section className='container flex flex-col items-start w-full gap-10 mx-auto mb-4'>
        <div className="w-[420px] h-8 justify-start items-start gap-5 inline-flex">
          <div className="w-1.5 h-[30px] bg-stone-800 rounded-[10px]" />
          <h4 className='text-xl md:text-3xl font-extralight'>Informacion</h4>
        </div>
        <Tabs aria-label="tabs" style="underline" borderPosition="bottom">
          <Tabs.Item title="Description">
            <div>
              <span>
                {product.description}
              </span>
            </div>
          </Tabs.Item>
          <Tabs.Item title="Comentarios">
            <div>
              <span>
                {product.comments.map((comment, index) => (
                  <div className='flex flex-col gap-2' key={index}>
                    <div className='flex items-center gap-2'>
                      <div className='flex flex-col'>
                        <span className='font-bold'>{comment?.user?.name}</span>
                        <span className='text-sm text-gray-500'>{comment?.createdAt}</span>
                      </div>
                    </div>
                    <span className='text-sm'>{comment.text}</span>
                  </div>
                ))}

              </span>

              {/* Add comment */}
              <div className='flex flex-col gap-2'>
                <span className='font-bold'>Agrega un comentario</span>
                <textarea className='w-full h-24 p-2 border border-gray-300 rounded-lg' onChange={(e) => setComment(e.target.value)} />
                <button className='w-32 h-10 px-4 py-2 font-bold text-white rounded-lg bg-stone-800' onClick={submitComment}>Enviar</button>
              </div>
            </div>
          </Tabs.Item>
        </Tabs>
      </section>
      <section className='container flex flex-col items-start w-full gap-10 mx-auto mb-4'>
        <div className="w-[420px] h-8 justify-start items-start gap-5 inline-flex">
          <div className="w-1.5 h-[30px] bg-stone-800 rounded-[10px]" />
          <h4 className='text-xl md:text-3xl font-extralight'>Productos del vendedor</h4>
        </div>



        <div className="container grid w-full grid-cols-3 gap-4 mx-auto">
          {otherProducts?.map((p) => (

            <div className=" w-[282px] h-[441px] " key={p.id}>
              <div className="relative">
                <img src={p.imageUrls[0]} alt="Producto 1" className="object-cover w-[282px] h-[370px] rounded-lg" />

                <div className="absolute top-0 right-0 mt-4 mr-4">
                  <div className="w-[32.36px] h-[32.36px] bg-white rounded-full flex items-center justify-center cursor-pointer" onClick={() => { addToFavorites(p.id) }}>
                    <FcLike size={15} />
                  </div>
                </div>
              </div>

              <div className='flex justify-between mt-3'>
                <div className='flex flex-col gap-2 cursor-pointer' onClick={() => navigate(`/products/${p.id}`)}>
                  <h3 className="text-base font-semibold ">{p.title}</h3>
                  <p className="text-sm font-medium ">{p.author.name}</p>
                </div>
                <div className="w-[82.31px] h-[36.58px] bg-neutral-100 rounded-lg flex items-center justify-center" >
                  <div className="text-sm font-bold text-center text-neutral-700 font-inter">$ {p.price}</div>
                </div>
              </div>
            </div>
          ))}
        </div>


      </section>
    </div >
  )
}

export default Product