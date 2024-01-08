import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../utils/apiServices';
import { useAuth } from '../provider/authProvider';
import Navbar from '../components/Navbar'
import { LuShoppingCart } from "react-icons/lu";
import { IoIosArrowRoundForward } from "react-icons/io";
import { CiDeliveryTruck, CiCreditCard1 } from "react-icons/ci";
import { RxSize } from "react-icons/rx";
import { useCart } from '../provider/cartProvider'



const Product = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const { token } = useAuth();
  const { addCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        ); // Ajusta la URL según tu API
        setProduct(response.data);
      } catch (error) {
        console.error('Error al obtener los datos del producto:', error);
      }
    };

    fetchProduct();
  }, [id]); // Dependencia para que se ejecute el useEffect cuando cambie el id

  if (!product) return <p>Cargando...</p>;

  return (
    <div className='flex flex-col w-full'>
      <Navbar />
      <section class="text-gray-600 body-font overflow-hidden mx-auto container ">
        <div class="px-5 py-24 ">
          <div class="w-full flex gap-4 justify-center">
            <div className='flex flex-col justify-center gap-4'>
              {
                product.imageUrls?.map((image) => (
                  <img src={image} alt="" className="object-cover w-16 h-16 rounded-lg" />
                ))
              }
            </div>
            <img alt="ecommerce" class="lg:w-[520px] w-full lg:h-[785px] h-[785px] object-fill object-center" src={product.imageUrls[0]} />

            <div class="lg:w-[534px] w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 class="text-sm title-font text-gray-500 tracking-widest">{product.author.name}</h2>
              <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{product.title}</h1>
              <div class="flex mb-4">
                <span class="flex items-center">
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-amber-300" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-amber-300" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-amber-300" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-amber-300" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-amber-300" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span class="text-gray-600 ml-3">{product.ratings.length} Reviews</span>
                </span>
                <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  {product.comments.length} <span class="text-gray-600 ml-3">Comentarios</span>
                </span>
              </div>
              <p class="leading-relaxed">{product.description}</p>
              <div class="flex flex-col items-start gap-3">
                <div className='flex gap-5'>
                  <span class="mr-3">Selecciona el tamaño</span>
                  <div className='flex items-center justify-center gap-1'>
                    <span>Tamaños en cm </span>

                    <IoIosArrowRoundForward size={20} />

                  </div>
                </div>
                <div class="flex gap-4">
                  {
                    product.sizes?.map((size) => (
                      <div
                        className={"flex items-center justify-center w-8 h-8 rounded-xl opacity-80 cursor-pointer  border border-[#8A8989]"}
                      >
                        <p className={`text-[14px] font-semibold text-center text-[#8A8989] font-inter `}>{size.name}</p>
                      </div>
                    ))
                  }
                </div>
              </div>
              <div class="flex flex-col mt-6 items-start pb-5 mb-5 gap-4">
                <span class="mr-3">Colores disponibles</span>
                <div class="flex gap-4">
                  {
                    product.colors?.map((color) => (
                      <button class={`border-2 rounded-full w-6 h-6 focus:outline-none`} style={
                        { backgroundColor: color.hex }
                      }></button>
                    ))
                  }
                </div>
              </div>
              <div className="w-96 h-11 justify-start items-start gap-3.5 flex border-b-2 border-gray-100 mb-8">
                <button className="flex items-center justify-center gap-4 px-10 py-3 rounded-lg cursor-pointer bg-stone-800" onClick={() => addCart({
                  productId: product.id,
                  quantity: 1
                })}>
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
      </section>

    </div>
  )
}

export default Product