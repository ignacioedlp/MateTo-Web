import React from 'react';
import VideoPlayer from '../components/VideoPlayer'; // Asume que este es el camino correcto
import DemostrationVideo from '../assets/demostracionapp.mp4'
import NavBar from '../components/Navbar'
import { FaCheckCircle } from 'react-icons/fa';


const features = [
  {
    name: 'Productos 100% Argentinos',
    description: 'Todos nuestros productos son de fabricacion nacional',
  },
  {
    name: 'Pago con Mercado Pago',
    description: 'Paga con el metodo mas seguro de la argentina',
  },
  {
    name: 'Envios a todo el pais',
    description: 'Recibe tus productos en la puerta de tu casa',
  },
  {
    name: 'Atencion al cliente',
    description: 'Estamos para ayudarte en lo que necesites',
  },
  {
    name: 'Si eres vendedor puedes unirte a nosotros',
    description: 'Unete a nuestra plataforma y vende tus productos',
  },
  {
    name: 'Minimalista',
    description: 'Nuestra aplicacion es minimalista y facil de usar',
  },
  {
    name: 'Filtra por los productos que mas te gusten',
    description: 'Ofrecemos filtros por precio, colores, tamaños y categorias',
  },
  {
    name: 'Favoritos',
    description: 'Guarda tus productos favoritos para comprarlos mas tarde',
  },
]

function Demostration() {
  return (
    <>
      <NavBar />
      <div className='flex flex-col items-center justify-around w-full gap-10 mt-10 lg:flex-row'>
        <div className="pt-16 mb-16 lg:mb-0 lg:max-w-lg lg:pr-5">
          <div className="max-w-xl mb-6">
            <div>
              <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                Mateto
              </p>
            </div>
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
              MateTo tiene su
              <br className="hidden md:block" />
              propia aplicacion.
            </h2>
            <p className="text-base text-gray-700 md:text-lg">
              Puedes descargar desde tu tienda la mejor aplicacion de mates de la argentina. Que esperas?
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <a href="/demostration" className="w-32 transition duration-300 hover:shadow-lg">
              <img src="https://kitwind.io/assets/kometa/app-store.png" className="object-cover object-top w-full h-auto mx-auto" alt="" />
            </a>
            <a href="/demostration" className="w-32 transition duration-300 hover:shadow-lg">
              <img src="https://kitwind.io/assets/kometa/google-play.png" className="object-cover object-top w-full h-auto mx-auto" alt="" />
            </a>
          </div>
        </div>
        <VideoPlayer src={DemostrationVideo} />
        <div className="pt-16 mb-16 lg:mb-0 lg:max-w-lg lg:pr-5">
          <ul className="pl-5 list-disc">

            {features.map((feature, index) => (
              <li className="flex items-center gap-4 mt-4">
                <FaCheckCircle className="w-6 h-6 text-teal-accent-400" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{feature.name}</h3>
                  <p className="text-base text-gray-700">{feature.description}</p>
                </div>
              </li>
            ))}
          </ul>


        </div>
      </div>
    </>
  );
}

export default Demostration;