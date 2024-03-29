import React, { useState } from 'react';
import { useAuth } from "../provider/authProvider";
import { useNavigate } from "react-router-dom";
import MatetoSvg from '../assets/mateto.svg'
import { LuUser2 } from "react-icons/lu";
import { FiShoppingCart } from "react-icons/fi";
import { MdOutlineFavoriteBorder } from "react-icons/md";



function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const { token, role } = useAuth();

  return (
    <nav className="relative shadow">
      <div className="container px-6 py-8 mx-auto md:flex">
        <div className="flex items-center justify-between">
          <a href="/">
            <img src={MatetoSvg} />
          </a>

          <div className="flex lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} type="button" className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
              {!isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white  md:mt-0 md:p-0 md:top-0 md:relative md:opacity-100 md:translate-x-0 md:flex md:items-center md:justify-between ${isOpen ? 'translate-x-0 opacity-100' : 'opacity-0 -translate-x-full'}`}>
          <div className="flex flex-col px-2 -mx-4 md:flex-row md:mx-10 md:py-0">
            {
              token ? (
                <>
                  <a href="/home" className="px-2 py-1 font-medium transition-colors duration-200 transform rounded-md text-md ">
                    Home
                  </a>
                  <a href="/products" className="px-2 py-1 font-medium transition-colors duration-200 transform rounded-md text-md">
                    Products
                  </a>
                  {
                    role === 'ADMIN' || role === 'VENDOR' ? (
                      <a href={`/${role === 'ADMIN' ? 'admin' : 'vendor'
                        }`} className="px-2 py-1 font-medium transition-colors duration-200 transform rounded-md text-md">
                        Mi panel
                      </a>
                    ) : null
                  }
                </>

              ) : null}
          </div>

          <div className="flex items-center mt-4 md:mt-0">
            {
              token ? (
                <div className="w-[156px] h-11 justify-start items-start gap-3 inline-flex">
                  <div className="flex items-center justify-center gap-3 p-3 rounded-lg bg-neutral-100">
                    <div className="relative w-5 h-5" ><a href="/cart"><FiShoppingCart size={20} color='#807D7E' /></a></div>
                  </div>
                  <div className="flex items-center justify-center gap-3 p-3 rounded-lg bg-neutral-100">
                    <div className="relative w-5 h-5" ><a href="/favorite"><MdOutlineFavoriteBorder size={20} color='#807D7E' /></a></div>
                  </div>
                  <div className="flex items-center justify-center gap-3 p-3 rounded-lg bg-neutral-100">
                    <div className="relative w-5 h-5" > <a href="/profile"><LuUser2 size={20} color='#807D7E' /></a></div>
                  </div>
                </div>


              ) : (
                <>
                  <button onClick={() => navigate('/login')} className="px-4 py-2 mx-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-black rounded-md ">
                    Login
                  </button>

                  <button onClick={() => navigate('/signup')} className="px-4 py-2 mx-2 text-sm font-medium tracking-wide text-black capitalize transition-colors duration-200 transform bg-white border-2 border-black rounded-md">
                    Sign Up
                  </button>
                </>
              )
            }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
