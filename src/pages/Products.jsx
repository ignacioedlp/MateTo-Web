import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RangeSlider from '../components/SliderRange'
import axiosInstance from '../utils/apiServices';
import { Skeleton } from "keep-react";
import { FcLike } from "react-icons/fc";
import { LuSettings2 } from "react-icons/lu";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

const colors = [
  { name: 'Purple', value: 'bg-purple-400' }, // Tailwind CSS class
  { name: 'Black', value: 'bg-gray-700' }, // Más oscuro que el típico, pero más claro que el negro
  { name: 'White', value: 'bg-white' },
  { name: 'Yellow', value: 'bg-yellow-400' },
  { name: 'Red', value: 'bg-red-400' },
  { name: 'Blue', value: 'bg-blue-400' },
  { name: 'Green', value: 'bg-green-400' },
  { name: 'Gray', value: 'bg-gray-400' },
  { name: 'Pink', value: 'bg-pink-400' },
  { name: 'Brown', value: 'bg-amber-400' }, // No hay un marrón en Tailwind, pero ámbar claro podría funcionar
  { name: 'Orange', value: 'bg-orange-400' },
  { name: 'Indigo', value: 'bg-indigo-400' },
];

const sizes = [
  { name: 'S', value: 's' },
  { name: 'M', value: 'm' },
  { name: 'L', value: 'l' },
  { name: 'XL', value: 'xl' },
  { name: 'XXL', value: 'xxl' },
];





const SkeletonComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center w-[282px] h-[441px] ">
      <Skeleton animation={true}>
        <div className="w-full">
          <Skeleton.Line height="h-[350px]" />
        </div>
      </Skeleton>
    </div>
  );
}


const Products = () => {
  const [products, setProducts] = useState([])
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [typeProducts, setTypeProducts] = useState("news");

  const handleAddColor = color => {
    if (selectedColors.find((selectedColor) => selectedColor === color)) {
      setSelectedColors(selectedColors.filter((selectedColor) => selectedColor !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  }

  const handleAddSize = size => {
    if (selectedSizes.find((selectedSize) => selectedSize === size)) {
      setSelectedSizes(selectedSizes.filter((selectedSize) => selectedSize !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  }

  const fetchData = async () => {
    const response = await axiosInstance.get('/products')
    setProducts(response.data)
  }

  const refreshItem = async (item) => {
    setTimeout(() => {
      console.log(`refreshing ${item}`);
      setProducts([]);
      setTypeProducts(item);
      fetchData();
    }, 1000);
  }

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <div>
      <Navbar />

      <section className='container flex items-start w-full gap-10 mx-auto'>
        <div className='bg-white border-t-2 border-x-2 border-stone-300 w-72 h-max mt-[50px]'>
          <div className='flex items-center justify-between px-6 py-5 border-b-2 border-stone-300'>
            <p className="text-zinc-500 text-[22px] font-semibold font-Inter tracking-wide">Filter</p>
            <LuSettings2 className='text-[22px] text-zinc-500' />
          </div>
          <div className='flex flex-col items-center justify-between gap-4 px-6 py-5 border-b-2 border-stone-300'>
            {
              [1, 2, 3, 4].map(() => (
                <div className='flex items-center justify-between w-full cursor-pointer'>
                  <p className="text-base font-semibold tracking-wide text-zinc-500 font-Inter">Categoria</p>
                  <IoIosArrowForward className='text-base text-zinc-500' />
                </div>
              ))
            }
          </div>
          <div className='flex items-center justify-between px-6 py-5 border-b-2 border-stone-300'>
            <p className="text-zinc-500 text-[22px] font-semibold font-Inter tracking-wide">Price</p>
            <IoIosArrowDown className='text-[22px] text-zinc-500' />
          </div>
          <div className='flex flex-col items-center justify-between w-full gap-4 px-6 py-5 border-b-2 border-stone-300'>
            <div className="flex items-center justify-between w-full">
              <RangeSlider />
            </div>
          </div>
          <div className='flex items-center justify-between px-6 py-5 border-b-2 border-stone-300'>
            <p className="text-zinc-500 text-[22px] font-semibold font-Inter tracking-wide">Color</p>
            <IoIosArrowDown className='text-[22px] text-zinc-500' />
          </div>
          <div className='flex flex-col items-center justify-between w-full gap-4 px-6 py-5 border-b-2 border-stone-300'>
            <div className='grid grid-cols-4 gap-4'>
              {
                colors.map((color) => (
                  <div className='flex flex-col items-center justify-center '>
                    <div
                      className={`flex items-center justify-center w-9 h-9 rounded-[12px] cursor-pointer ${color.value}
                          ${selectedColors.includes(color.value) ? `border-2 p-1` : ''}`}
                      onClick={() => handleAddColor(color.value)}
                    >
                      {selectedColors.includes(color.value) && (
                        <div className={`w-3 h-3 bg-stone-300 rounded-full`}></div>
                      )}
                    </div>
                    <p className='text-[14px] font-semibold text-center text-[#8A8989] font-Inter'>{color.name}</p>
                  </div>
                ))
              }
            </div>
          </div>
          <div className='flex items-center justify-between px-6 py-5 border-b-2 border-stone-300'>
            <p className="text-zinc-500 text-[22px] font-semibold font-Inter tracking-wide">Sizes</p>
            <IoIosArrowDown className='text-[22px] text-zinc-500' />
          </div>
          <div className='flex flex-col items-center justify-between w-full gap-4 px-6 py-5 border-b-2 border-stone-300'>
            <div className='grid grid-cols-3 gap-4'>
              {
                sizes.map((size) => (
                  <div
                    className={`flex items-center justify-center w-[61px] h-8 rounded-lg opacity-80 cursor-pointer0" 

                          ${selectedSizes.includes(size.value) ? `border-2 border-stone-700` : 'border border-[#8A8989]'}`}
                    onClick={() => handleAddSize(size.value)}
                  >
                    <p className={`text-[14px] font-semibold text-center text-[#8A8989] font-Inter ${selectedSizes.includes(size.value) ? ` text-stone-700` : ''}`}>{size.name}</p>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div class="flex-col">

          <div className="relative h-6 w-96 my-[50px]">
            <div className={`absolute top-0 left-0 text-xl font-semibold  font-Inter `}>Nuestros equipos</div>
            <button className={`left-[631px] top-0 absolute ${typeProducts === 'news' ? "text-stone-800" : "text-zinc-400"} text-xl font-semibold font-Inter cursor-pointer`} onClick={() => refreshItem("news")}>Nuevos</button>
            <button className={`left-[728px] top-0 absolute ${typeProducts === 'recomended' ? "text-stone-800" : "text-zinc-400"} text-xl font-semibold font-Inter cursor-pointer`} onClick={() => refreshItem("recomended")}>Recomendados</button>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {
              [1, 2, 3, 4, 5, 6, 7].map(() => (
                products.length > 0 ?
                  <div className=" w-[282px] h-[441px] ">
                    <div className="relative">
                      <img src={products[0].imageUrls[0]} alt="Producto 1" className="object-cover w-[282px] h-[370px] rounded-lg" />

                      <div className="absolute top-0 right-0 mt-4 mr-4">
                        <div className="w-[32.36px] h-[32.36px] bg-white rounded-full flex items-center justify-center">
                          <FcLike size={20} />
                        </div>
                      </div>
                    </div>

                    <div className='flex justify-between mt-3'>
                      <div className='flex flex-col gap-2'>
                        <h3 className="text-base font-semibold ">{products[0].title}</h3>
                        <p className="text-sm font-medium ">{products[0].author.name}</p>
                      </div>
                      <div className="w-[82.31px] h-[36.58px] bg-neutral-100 rounded-lg flex items-center justify-center" >
                        <div className="text-sm font-bold text-center text-neutral-700 font-Inter">$ {products[0].price}</div>
                      </div>
                    </div>
                  </div>
                  : <SkeletonComponent />
              ))
            }
          </div>
        </div>
      </section >

    </div >
  )
}

Products.propTypes = {}

export default Products