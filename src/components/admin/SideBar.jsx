import React from 'react'
import { useAuth } from '../../provider/authProvider'
import { decodeToken } from '../../utils/jwt';
import { IoAccessibility, IoAnalytics } from "react-icons/io5";
import { IoMdSettings, IoIosBusiness } from "react-icons/io";
import axios from "axios";
import { useNavigate } from 'react-router-dom';



const SideBar = ({ page }) => {

  const { token, clearAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    delete axios.defaults.headers.common["Authorization"];
    clearAuth();
    navigate('/login');
  }

  return (
    <div className="flex flex-col justify-between w-16 h-screen bg-white border-e">
      <div>
        <div className="inline-flex items-center justify-center w-16 h-16">
          <span
            className="grid w-10 h-10 text-xs text-gray-600 bg-gray-100 rounded-lg place-content-center"
          >
            {
              decodeToken(token).username[0]
            }
          </span>
        </div>

        <div className="border-t border-gray-100">
          <div className="px-2">

            <ul className="pt-4 space-y-4 border-t border-gray-100">
              <li>
                <a
                  href="/admin"
                  className={`group relative flex justify-center rounded px-2 py-1.5 ${page === 'Home' ? "bg-black" : " bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700"} `}
                >
                  <IoAnalytics size={20} className={`opacity-75 ${page === 'Home' && "text-white opacity-100"}`} />


                  <span
                    className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                  >
                    Panel
                  </span>
                </a>
              </li>

              <li>
                <a
                  href="/admin/customers"
                  className={`group relative flex justify-center rounded px-2 py-1.5 ${page === 'Customers' ? "bg-black" : " bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700"} `}
                >
                  <IoIosBusiness size={20} className={`opacity-75 ${page === 'Customers' && "text-white opacity-100"}`} />

                  <span
                    className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                  >
                    Customers
                  </span>
                </a>
              </li>

              <li>
                <a
                  href="/admin/users"
                  className={`group relative flex justify-center rounded px-2 py-1.5 ${page === 'Users' ? "bg-black" : " bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700"} `}
                >
                  <IoAccessibility size={20} className={`opacity-75 ${page === 'Users' && "text-white opacity-100"}`} />

                  <span
                    className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                  >
                    Usuarios
                  </span>
                </a>
              </li>

              <li>
                <a
                  href="/admin/settings" className={`group relative flex justify-center rounded px-2 py-1.5 ${page === 'Settings' ? "bg-black" : " bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700"} `}
                >
                  <IoMdSettings size={20} className={`opacity-75 ${page === 'Settings' && "text-white "}`} />

                  <span
                    className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                  >
                    Ajuster
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="sticky inset-x-0 bottom-0 p-2 bg-white border-t border-gray-100">
        <div>
          <button
            onClick={() => handleLogout()}
            className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 opacity-75"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>

            <span
              className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
            >
              Logout
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SideBar