import React from 'react'
import WelcomePhone from '../assets/welcomePhone.png'
import WelcomeDesk from '../assets/welcomeDesk.png'
import MateToIcon from '../assets/icon.svg'
import NavBar from '../components/Navbar'

const Welcome = () => {
  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-between max-w-xl px-4 mx-auto mt-20 mb-32 lg:pt-16 lg:flex-row md:px-8 lg:max-w-screen-xl">
        <div className="max-w-xl mx-auto lg:max-w-screen-xl">
          <div className="mb-16 lg:max-w-lg lg:mb-0">
            <div className="max-w-xl mb-6">
              <div>
                <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                  MateTo
                </p>
              </div>
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                Nunca fue tan fácil
                <br className="hidden md:block" />
                encontrar tu equipo {" "}
                <span className="inline-block text-deep-purple-accent-400">
                  matero.
                </span>
              </h2>
              <p className="text-base text-gray-700 md:text-lg">
                En MateTo vas a poder encontrar tu mate y accesorios deseados. Mas de 1000 productos y 100 marcas argentinas.
              </p>
            </div>
            <div className="flex items-center">
              <a
                href="/login"
                className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-black transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
              >
                Comenzar
              </a>
              <a
                href="/"
                aria-label=""
                className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
              >
                Ver mas
              </a>
            </div>
          </div>
        </div>

        <img
          src={WelcomeDesk}
          className="object-cover object-top w-full h-64 max-w-xl -mb-16 rounded lg:ml-64 xl:ml-8 lg:-mb-24 xl:-mb-28 lg:h-auto lg:max-w-screen-md"
          alt=""
        />

      </div>
      <div className="flex flex-col justify-between max-w-xl px-4 mx-auto my-32 lg:pt-16 lg:flex-row md:px-8 lg:max-w-screen-xl">
        <div>
          <img
            src={WelcomePhone}
            className="hidden object-cover object-top w-full h-64 mx-auto lg:h-auto xl:mr-24 md:max-w-sm md:flex"
            alt=""
          />
        </div>
        <div className="pt-16 mb-16 lg:mb-0 lg:pt-32 lg:max-w-lg lg:pr-5">
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
        <div>
          <img
            src={WelcomePhone}
            className="flex object-cover object-top w-full mx-auto lg:h-auto xl:mr-24 md:max-w-sm md:hidden"
            alt=""
          />
        </div>
      </div>
      <div className="px-4 py-16 mx-auto my-32 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="grid gap-5 row-gap-10 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <div className="max-w-xl mb-6">
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                Tenemos mas de
                <br className="hidden md:block" />
                100 diferentes marcas
                <span className="relative px-1">
                  <div className="absolute inset-x-0 bottom-0 h-3 transform -skew-x-12 bg-teal-accent-400" />
                  <span className="relative inline-block text-deep-purple-accent-400">
                    argentinas.
                  </span>
                </span>
              </h2>
              <p className="text-base text-gray-700 md:text-lg">
                En MateTo encontraras productos 100% argentinos de las mejores marcas que se dedican a la vida matera.
              </p>
            </div>
            <p className="mb-4 text-sm font-bold tracking-widest uppercase">
              Nuestras marcas
            </p>
            <div className="grid space-y-3 sm:gap-2 sm:grid-cols-2 sm:space-y-0">
              <ul className="space-y-3">
                <li className="flex">
                  <span className="mr-1">
                    <svg
                      className="w-5 h-5 mt-px text-deep-purple-accent-400"
                      stroke="currentColor"
                      viewBox="0 0 52 52"
                    >
                      <polygon
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        points="29 13 14 29 25 29 23 39 38 23 27 23"
                      />
                    </svg>
                  </span>
                  Mateando
                </li>
                <li className="flex">
                  <span className="mr-1">
                    <svg
                      className="w-5 h-5 mt-px text-deep-purple-accent-400"
                      stroke="currentColor"
                      viewBox="0 0 52 52"
                    >
                      <polygon
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        points="29 13 14 29 25 29 23 39 38 23 27 23"
                      />
                    </svg>
                  </span>
                  Clan Matero
                </li>
                <li className="flex">
                  <span className="mr-1">
                    <svg
                      className="w-5 h-5 mt-px text-deep-purple-accent-400"
                      stroke="currentColor"
                      viewBox="0 0 52 52"
                    >
                      <polygon
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        points="29 13 14 29 25 29 23 39 38 23 27 23"
                      />
                    </svg>
                  </span>
                  Vida Matera
                </li>
              </ul>
              <ul className="space-y-3">
                <li className="flex">
                  <span className="mr-1">
                    <svg
                      className="w-5 h-5 mt-px text-deep-purple-accent-400"
                      stroke="currentColor"
                      viewBox="0 0 52 52"
                    >
                      <polygon
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        points="29 13 14 29 25 29 23 39 38 23 27 23"
                      />
                    </svg>
                  </span>
                  CalaMates
                </li>
                <li className="flex">
                  <span className="mr-1">
                    <svg
                      className="w-5 h-5 mt-px text-deep-purple-accent-400"
                      stroke="currentColor"
                      viewBox="0 0 52 52"
                    >
                      <polygon
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        points="29 13 14 29 25 29 23 39 38 23 27 23"
                      />
                    </svg>
                  </span>
                  Union del Mate
                </li>
                <li className="flex">
                  <span className="mr-1">
                    <svg
                      className="w-5 h-5 mt-px text-deep-purple-accent-400"
                      stroke="currentColor"
                      viewBox="0 0 52 52"
                    >
                      <polygon
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        points="29 13 14 29 25 29 23 39 38 23 27 23"
                      />
                    </svg>
                  </span>
                  Digalo con Mate
                </li>
              </ul>
            </div>
          </div>
          <div>
            <img
              className="object-cover w-full h-56 rounded shadow-lg sm:h-96"
              src="https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="px-4 py-16 mx-auto my-32 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <div>
            <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
              MateTo
            </p>
          </div>
          <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            <span className="relative inline-block">
              <svg
                viewBox="0 0 52 24"
                fill="currentColor"
                className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
              >
                <defs>
                  <pattern
                    id="b902cd03-49cc-4166-a0ae-4ca1c31cedba"
                    x="0"
                    y="0"
                    width=".135"
                    height=".30"
                  >
                    <circle cx="1" cy="1" r=".7" />
                  </pattern>
                </defs>
                <rect
                  fill="url(#b902cd03-49cc-4166-a0ae-4ca1c31cedba)"
                  width="52"
                  height="24"
                />
              </svg>
              <span className="relative">Disfruta</span>
            </span>{' '}
            rapido, facil y seguro.
          </h2>
          <p className="text-base text-gray-700 md:text-lg">
            MateTo te permite realizar la compra personalizada de tus productos de una manera muy sencilla y rapida.
          </p>
        </div>
        <div className="grid gap-10 lg:grid-cols-4 sm:grid-cols-2">
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-2xl font-bold">Paso 1</p>
              <svg
                className="w-6 text-gray-700 transform rotate-90 sm:rotate-0"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <line
                  fill="none"
                  strokeMiterlimit="10"
                  x1="2"
                  y1="12"
                  x2="22"
                  y2="12"
                />
                <polyline
                  fill="none"
                  strokeMiterlimit="10"
                  points="15,5 22,12 15,19 "
                />
              </svg>
            </div>
            <p className="text-gray-600">
              Mira nuestros productos y filtra por el tipo, categoria, medidas y colores que desees.
            </p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-2xl font-bold">Paso 2</p>
              <svg
                className="w-6 text-gray-700 transform rotate-90 sm:rotate-0"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <line
                  fill="none"
                  strokeMiterlimit="10"
                  x1="2"
                  y1="12"
                  x2="22"
                  y2="12"
                />
                <polyline
                  fill="none"
                  strokeMiterlimit="10"
                  points="15,5 22,12 15,19 "
                />
              </svg>
            </div>
            <p className="text-gray-600">
              Selecciona el producto que mas te guste y agregalo al carrito de compras.
            </p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-2xl font-bold">Paso 3</p>
              <svg
                className="w-6 text-gray-700 transform rotate-90 sm:rotate-0"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <line
                  fill="none"
                  strokeMiterlimit="10"
                  x1="2"
                  y1="12"
                  x2="22"
                  y2="12"
                />
                <polyline
                  fill="none"
                  strokeMiterlimit="10"
                  points="15,5 22,12 15,19 "
                />
              </svg>
            </div>
            <p className="text-gray-600">
              Realiza el pago de tus productos por medio de Mercado pago y tu pedido se enviara a tu domicio.
            </p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-2xl font-bold">A disfrutar</p>
              <svg
                className="w-8 text-gray-600"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <polyline
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  points="6,12 10,16 18,8"
                />
              </svg>
            </div>
            <p className="text-gray-600">
              Tu pedido llegara a tu domicilio y podras disfrutar de todos tus productos.
            </p>
          </div>
        </div>
      </div>
      <div className="px-4 pt-16 mx-auto mt-32 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <a
              href="/"
              aria-label="Go home"
              title="Company"
              className="inline-flex items-center"
            >
              <img
                src={MateToIcon}
                className="w-16 h-16"
                alt=""
              />

              <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                MateTo
              </span>
            </a>
            <div className="mt-6 lg:max-w-sm">
              <p className="text-sm text-gray-800">
                Una solucion a la hora de comprar tus productos materos.
              </p>
              <p className="mt-4 text-sm text-gray-800">
                Productos de calidad y de las mejores marcas argentinas.
              </p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-base font-bold tracking-wide text-gray-900">
              Contactos
            </p>
            <div className="flex">
              <p className="mr-1 text-gray-800">Celular:</p>
              <a
                href="tel:850-123-5021"
                aria-label="Our phone"
                title="Our phone"
                className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
              >
                221-524-5019
              </a>
            </div>
            <div className="flex">
              <p className="mr-1 text-gray-800">Email:</p>
              <a
                href="mailto:ignaciocafiero12@gmail.com"
                aria-label="Our email"
                title="Our email"
                className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
              >
                ignaciocafiero12@gmail.com
              </a>
            </div>
            <div className="flex">
              <p className="mr-1 text-gray-800">Ciudad:</p>
              <a
                href="https://www.google.com/maps"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Our address"
                title="Our address"
                className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
              >
                La Plata, Argentina 💘
              </a>
            </div>
          </div>
          <div>
            <span className="text-base font-bold tracking-wide text-gray-900">
              Social
            </span>
            <div className="flex items-center mt-1 space-x-3">
              <a
                href="https://twitter.com/Tofidev"
                className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                  <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/tofiedlp1/"
                className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                <svg viewBox="0 0 30 30" fill="currentColor" className="h-6">
                  <circle cx="15" cy="15" r="4" />
                  <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/ignacio-cafiero-torrubia/"
                className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                  <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
          <p className="text-sm text-gray-600">
            © Copyright 2024 ToxeDev. All rights reserved.
          </p>
          <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
            <li>
              <a
                href="/"
                className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                F.A.Q
              </a>
            </li>
            <li>
              <a
                href="/"
                className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                Politica de privacidad
              </a>
            </li>
            <li>
              <a
                href="/"
                className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                Terminos &amp; Condiciones
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

Welcome.propTypes = {}

export default Welcome