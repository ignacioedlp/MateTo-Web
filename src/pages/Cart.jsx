import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Navbar from '../components/Navbar'
import { useCart } from '../provider/cartProvider'
import axiosInstance from '../utils/apiServices'
import { FcLike, FcDislike } from "react-icons/fc";

const Cart = props => {
  const { cart, removeCart } = useCart()


  return (
    <div>
      <Navbar />
      {
        cart?.length > 0 ? (

          <section>
            <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
              <div class="mx-auto max-w-3xl">
                <header class="text-center">
                  <h1 class="text-xl font-bold text-gray-900 sm:text-3xl">Your Cart</h1>
                </header>

                <div class="mt-8">
                  <ul class="space-y-4">


                    {cart?.map((item, index) => (
                      <li class="flex items-center gap-4">
                        <img
                          src={item?.product.imageUrls[0]}
                          alt=""
                          class="h-16 w-16 rounded object-cover"
                        />

                        <div>
                          <h3 class="text-sm text-gray-900">{item?.product.title}</h3>

                          <dl class="mt-0.5 space-y-px text-[10px] text-gray-600">
                            <div>
                              <dt class="inline">Size:</dt>
                              <dd class="inline">XXS</dd>
                            </div>

                            <div>
                              <dt class="inline">Color:</dt>
                              <dd class="inline">White</dd>
                            </div>
                          </dl>
                        </div>

                        <div class="flex flex-1 items-center justify-end gap-2">
                          <form>
                            <label for="Line1Qty" class="sr-only"> Quantity </label>

                            <input
                              type="number"
                              min="1"
                              value={item?.quantity}
                              id="Line1Qty"
                              class="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                            />
                          </form>

                          <button class="text-gray-600 transition hover:text-red-600">
                            <span class="sr-only">Remove item</span>

                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="h-4 w-4"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div class="mt-8 flex justify-end border-t border-gray-100 pt-8">
                    <div class="w-screen max-w-lg space-y-4">
                      <dl class="space-y-0.5 text-sm text-gray-700">
                        <div class="flex justify-between">
                          <dt>Subtotal</dt>
                          <dd>
                            ${cart?.reduce((acc, item) => acc + item?.product.price * item?.quantity, 0)}
                          </dd>
                        </div>

                        <div class="flex justify-between !text-base font-medium">
                          <dt>Total</dt>
                          <dd>
                            ${cart?.reduce((acc, item) => acc + item?.product.price * item?.quantity, 0)}
                          </dd>
                        </div>
                      </dl>

                      

                      <div class="flex justify-end">
                        <a
                          href="#"
                          class="block rounded bg-black px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                        >
                          Ir a pagar
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="flex flex-col items-center justify-center w-full h-full">
              <h1 className="text-4xl font-bold text-neutral-900">Tu carrito</h1>
              <div className="flex flex-col items-center justify-center w-full h-full">
                <h1 className="text-2xl font-bold text-neutral-900">No tienes items</h1>
              </div>
            </div>
          </div>
        )
      }
    </div >
  )
}

Cart.propTypes = {}

export default Cart