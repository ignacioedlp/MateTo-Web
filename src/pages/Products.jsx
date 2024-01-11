import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RangeSlider from '../components/SliderRange'
import api from '../utils/apiServices';
import { Skeleton } from "keep-react";
import { FcLike } from "react-icons/fc";
import { LuSettings2 } from "react-icons/lu";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { useSettings } from '../provider/settingsProvider';
import axios from 'axios'
import { useAuth } from '../provider/authProvider';
import { useNavigate } from "react-router-dom";



const SkeletonComponent = () => {
  return (
    <div className="grid w-full grid-cols-3 gap-4 mx-auto">
      {[1, 2, 3, 4, 5, 6, 7].map((i, index) => (
        <div className="flex flex-col items-center justify-center w-[282px] h-[441px] " key={index} >
          <Skeleton animation={true}>
            <div className="w-full">
              <Skeleton.Line height="h-[350px]" />
            </div>
          </Skeleton>
        </div>
      ))}
    </div>
  );
}


const Products = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedProductType, setSelectedProductType] = useState(null);
  const [range, setRange] = useState({
    priceMin: 0,
    priceMax: 100000,
  });
  const [selectedProductCategory, setSelectedProductCategory] = useState(null);

  const [section, setSection] = useState("news");

  const { settings } = useSettings();
  const { token } = useAuth();
  const navigate = useNavigate();


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

  const handleRangeChange = (event) => {
    setRange({
      ...range,
      [event.target.name]: parseInt(event.target.value)
    })
  };

  const fetchProducts = async (sections) => {
    const response = await api.products.getProducts({
      userAuthToken: token,
      params: {
        sections,
        type: selectedProductType,
        category: selectedProductCategory,
        priceMin: range.priceMin,
        priceMax: range.priceMax,
        colors: selectedColors,
        sizes: selectedSizes,
      }
    }).request

    setProducts(response.data)
  };

  const addToFavorites = async (id) => {
    await api.user.favorites.addToFavorites({
      userAuthToken: token,
      productId: id,
    }).request
  }

  const fetchData = async (sections) => {
    await fetchProducts(sections)
    setIsLoading(false)
  }

  const refreshItem = async (section) => {
    setSection(section);
    setIsLoading(true);
    setProducts([]);
    fetchData(section);
  }

  useEffect(() => {
    setProducts([])
    setIsLoading(true)
    fetchData("news")
  }, []);

  useEffect(() => {
    fetchData()
  }, [selectedProductType, selectedProductCategory, range, selectedColors, selectedSizes]);

  return (
    <div>
      <Navbar />

      <section className='container flex items-start w-full gap-10 mx-auto mb-4'>
        <div className='bg-white border-t-2 border-x-2 border-stone-300 w-72 h-max mt-[50px]'>
          <div className='flex items-center justify-between px-6 py-5 border-b-2 border-stone-300'>
            <p className="text-zinc-500 text-[22px] font-semibold font-inter tracking-wide">Filtros</p>
            <LuSettings2 className='text-[22px] text-zinc-500' />
          </div>
          <div className='flex flex-col items-center justify-between gap-4 px-6 py-5 border-b-2 border-stone-300'>
            {
              settings.productCategories?.map((s) => (
                <div className='flex items-center justify-between w-full cursor-pointer' onClick={() => setSelectedProductCategory(s.id)} key={s.id}>
                  <p className="text-base font-semibold tracking-wide capitalize text-zinc-500 font-inter">{s.name}</p>
                  <IoIosArrowForward className='text-base text-zinc-500' />
                </div>
              ))
            }
          </div>
          <div className='flex items-center justify-between px-6 py-5 border-b-2 border-stone-300'>
            <p className="text-zinc-500 text-[22px] font-semibold font-inter tracking-wide">Tipo</p>
            <IoIosArrowDown className='text-[22px] text-zinc-500' />
          </div>
          <div className='flex flex-col items-center justify-between gap-4 px-6 py-5 border-b-2 border-stone-300'>
            {
              settings.productTypes?.map((s) => (
                <div className='flex items-center justify-between w-full cursor-pointer' onClick={() => setSelectedProductType(s.id)} key={s.id}>
                  <p className="text-base font-semibold tracking-wide capitalize text-zinc-500 font-inter">{s.name}</p>
                  <IoIosArrowForward className='text-base text-zinc-500' />
                </div>
              ))
            }
          </div>
          <div className='flex items-center justify-between px-6 py-5 border-b-2 border-stone-300'>
            <p className="text-zinc-500 text-[22px] font-semibold font-inter tracking-wide">Precio</p>
            <IoIosArrowDown className='text-[22px] text-zinc-500' />
          </div>
          <div className='flex flex-col items-center justify-between w-full gap-4 px-6 py-5 border-b-2 border-stone-300'>
            <div className="flex items-center justify-between w-full">
              <div className="w-full ">
                <div className="flex justify-between">
                  <label htmlFor="min" className="text-sm font-medium text-gray-700">Min</label>
                  <label htmlFor="max" className="text-sm font-medium text-gray-700">Max</label>
                </div>
                <div className="flex justify-between gap-4 mt-1">
                  <input
                    type="number"
                    name="priceMin"
                    id="priceMin"
                    value={range.priceMin}
                    onChange={handleRangeChange}
                    className="w-1/2 px-2 py-1 text-sm text-gray-700 placeholder-gray-500 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                  <input
                    type="number"
                    name="priceMax"
                    id="priceMax"
                    value={range.priceMax}
                    onChange={handleRangeChange}
                    className="w-1/2 px-2 py-1 text-sm text-gray-700 placeholder-gray-500 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='flex items-center justify-between px-6 py-5 border-b-2 border-stone-300'>
            <p className="text-zinc-500 text-[22px] font-semibold font-inter tracking-wide">Color</p>
            <IoIosArrowDown className='text-[22px] text-zinc-500' />
          </div>
          <div className='flex flex-col items-center justify-between w-full gap-4 px-6 py-5 border-b-2 border-stone-300'>
            <div className='grid grid-cols-4 gap-4'>
              {
                settings.colors?.map((color) => (
                  <div className='flex flex-col items-center justify-center ' key={color.id}>
                    <div
                      className={`flex items-center justify-center w-9 h-9 rounded-[12px] cursor-pointer
                          ${selectedColors.includes(color.id) ? `border-2 p-1` : ''}`}
                      style={{ backgroundColor: color.hex }}
                      onClick={() => handleAddColor(color.id)}
                    >
                      {selectedColors.includes(color.id) && (
                        <div className={`w-3 h-3 bg-stone-300 rounded-full`}></div>
                      )}
                    </div>
                    <p className='text-[14px] font-semibold text-center text-[#8A8989] font-inter capitalize'>{color.name}</p>
                  </div>
                ))
              }
            </div>
          </div>
          <div className='flex items-center justify-between px-6 py-5 border-b-2 border-stone-300'>
            <p className="text-zinc-500 text-[22px] font-semibold font-inter tracking-wide">Tamaños</p>
            <IoIosArrowDown className='text-[22px] text-zinc-500' />
          </div>
          <div className='flex flex-col items-center justify-between w-full gap-4 px-6 py-5 border-b-2 border-stone-300'>
            <div className='grid grid-cols-3 gap-4'>
              {
                settings.sizes?.map((size) => (
                  <div
                    className={`flex items-center justify-center w-[61px] h-8 rounded-lg opacity-80 cursor-pointer0" 

                          ${selectedSizes.includes(size.id) ? `border-2 border-stone-700` : 'border border-[#8A8989]'}`}
                    onClick={() => handleAddSize(size.id)}
                    key={size.id}
                  >
                    <p className={`text-[14px] font-semibold text-center text-[#8A8989] font-inter ${selectedSizes.includes(size.id) ? ` text-stone-700` : ''}`}>{size.name}</p>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className="flex-col w-full">

          <div className="flex justify-between h-6 w-full my-[50px]">
            <div className={`text-xl font-semibold  font-inter `}>Nuestros equipos</div>
            <div className='flex gap-4'>
              <button className={`${section === 'news' ? "text-stone-800" : "text-zinc-400"} text-xl font-semibold font-inter cursor-pointer`} onClick={() => refreshItem("news")}>Nuevos</button>
              <button className={` ${section === 'recomended' ? "text-stone-800" : "text-zinc-400"} text-xl font-semibold font-inter cursor-pointer`} onClick={() => refreshItem("recomended")}>Recomendados</button>
            </div>
          </div>


          {isLoading ?
            (<SkeletonComponent />) : (

              products?.length > 0 ?
                <div className="grid w-full grid-cols-3 gap-4 mx-auto">
                  {products?.map((p) => (
                    <div className=" w-[282px] h-[441px] " key={p.id}>
                      <div className="relative">
                        <img src={p.imageUrls[0]} alt="Producto 1" className="object-cover w-[282px] h-[370px] rounded-lg" />

                        <div className="absolute top-0 right-0 mt-4 mr-4">
                          <div className="w-[32.36px] h-[32.36px] bg-white rounded-full flex items-center justify-center" onClick={() => { addToFavorites(p.id) }}>
                            <FcLike size={15} />
                          </div>
                        </div>
                      </div>

                      <div className='flex justify-between mt-3'>
                        <div className='flex flex-col gap-2 ' onClick={() => navigate(`/products/${p.id}`)}>
                          <h3 className="text-base font-semibold ">{p.title}</h3>
                          <p className="text-sm font-medium ">{p.author.name}</p>
                        </div>
                        <div className="w-[82.31px] h-[36.58px] bg-neutral-100 rounded-lg flex items-center justify-center" >
                          <div className="text-sm font-bold text-center text-neutral-700 font-inter">$ {p.price}</div>
                        </div>
                      </div>
                    </div>
                  ))
                  }</div> : (
                  <div className="flex items-center justify-center w-full ">
                    <p className="text-2xl font-semibold text-center text-neutral-700 font-inter">No hay productos</p>
                  </div>
                ))}
        </div>
      </section >
    </div >
  )
}

Products.propTypes = {}

export default Products