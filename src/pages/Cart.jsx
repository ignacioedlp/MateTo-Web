import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useAuth } from '../provider/authProvider'
import api from '../utils/apiServices';
import { useNavigate } from 'react-router-dom'
import { Spinner, Button } from "keep-react";
import { Player } from '@lottiefiles/react-lottie-player';
import CartEmpty from '../assets/cartEmpty.svg'

const Cart = () => {

  const [cart, setCart] = useState(null)
  const [creationOrder, setCreationOrder] = useState(false)
  const { token } = useAuth()
  const navigate = useNavigate();


  useEffect(() => {
    const getCart = async () => {

      const { data } = await api.user.cart.getCart({
        userAuthToken: token,
      }).request

      setCart(data)
    }
    getCart()
  }, []);

  const updateCartQuantity = async (id, quantity) => {
    await api.user.cart.addToCart({
      userAuthToken: token,
      data: {
        productId: id,
        quantity: quantity,
        replace: true
      },
    }).request

  }

  const removeCart = async (id) => {
    await api.user.cart.deleteFromCart({
      userAuthToken: token,
      productId: id,
    }).request
  }

  const createOrder = async () => {
    setCreationOrder(true)
    const { data } = await api.purchases.createPurchase({
      userAuthToken: token,
      data: {
        totalDiscount: 0,
        addressLine: "Calle 123",
        city: "CABA",
        state: "CABA",
        postalCode: "1234",
        phoneNumber: "1234567890",
        purchaseItems: cart.map(item => {
          return {
            productId: item.product.id,
            quantity: item.quantity,
            price: item.product.price,
            title: item.product.title
          }
        })
      },
    }).request

    setCreationOrder(false)

    if (data.preference.sandbox_init_point) {
      window.location.href = data.preference.sandbox_init_point
    }

  }

  if (!cart) return (
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
    <>
      <Navbar />
      {
        cart?.length > 0 ? (

          <section>
            <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
              <div className="max-w-3xl mx-auto">
                <header className="text-center">
                  <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Tu carrito</h1>
                </header>

                <div className="mt-8">
                  <ul className="space-y-4">


                    {cart?.map((item, index) => (
                      <li className="flex items-center gap-4" key={index}>
                        <img
                          src={item?.product.imageUrls[0]}
                          alt=""
                          className="object-cover w-16 h-16 rounded"
                        />

                        <div>
                          <h3 className="text-sm text-gray-900">{item?.product.title}</h3>

                          <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                            <div>
                              <dt className="inline">Size:</dt>
                              <dd className="inline">XXS</dd>
                            </div>

                            <div>
                              <dt className="inline">Color:</dt>
                              <dd className="inline">White</dd>
                            </div>
                          </dl>
                        </div>

                        <div className="flex items-center justify-end flex-1 gap-2">
                          <form>
                            <label htmlFor="Line1Qty" className="sr-only"> Quantity </label>

                            <input
                              type="number"
                              min="1"
                              id="Line1Qty"
                              defaultValue={item?.quantity}
                              onChange={async (e) => await updateCartQuantity(item?.product.id, e.target.value)}
                              className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                            />
                          </form>

                          <button className="text-gray-600 transition hover:text-red-600" onClick={async (e) => await removeCart(item?.product.id, e.target.value)}>
                            <span className="sr-only">Remove item</span>

                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="flex justify-end pt-8 mt-8 border-t border-gray-100">
                    <div className="w-screen max-w-lg space-y-4">
                      <dl className="space-y-0.5 text-sm text-gray-700">
                        <div className="flex justify-between">
                          <dt>Subtotal</dt>
                          <dd>
                            ${cart?.reduce((acc, item) => acc + item?.product.price * item?.quantity, 0)}
                          </dd>
                        </div>

                        <div className="flex justify-between !text-base font-medium">
                          <dt>Total</dt>
                          <dd>
                            ${cart?.reduce((acc, item) => acc + item?.product.price * item?.quantity, 0)}
                          </dd>
                        </div>
                      </dl>



                      <div className="flex justify-end">
                        {
                          creationOrder ? (
                            <Spinner color="gray" size="lg" />
                          ) : (
                            <Button
                              onClick={createOrder}
                              className="block text-sm text-gray-100 transition bg-black rounded hover:bg-gray-600"
                            >
                              Ir a pagar
                            </Button>
                          )
                        }

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <div className='flex flex-col items-center justify-center gap-4 p-64'>
            <img src={CartEmpty} alt="Carrito vacio" className="object-cover rounded-lg" />
            <h3 className='text-[34px] font-thin'>
              Tu carrito esta vacio y triste :(
            </h3>
            <span className='text-[16px] font-thin text-[#807D7E]'>
              Agrega algo para hacerlo feliz
            </span>
            <button className='px-[48px] py-[12px] font-bold text-white bg-[#292526] rounded-lg' onClick={() => navigate('/products')}>
              <span className='font-bold text-[18px]'>Continuar comprando</span>
            </button>
          </div>
        )
      }
    </>
  )
}

Cart.propTypes = {}

export default Cart