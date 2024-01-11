import PropTypes from 'prop-types'
import Navbar from '../../components/Navbar'
import MatePhoto from '../../assets/image1.png'
import { Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import api from '../../utils/apiServices';
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from 'sonner';



const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required('Required'),
  passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const SignUp = props => {
  const [isUser, setIsUser] = useState(true)
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="bg-white ">
        <div className="flex justify-center min-h-screen">
          <div className="hidden bg-cover lg:block lg:w-2/5">
            <img src={MatePhoto} alt="unsplash random" className="object-cover w-full h-full" />
          </div>

          <div className="flex items-start w-full max-w-3xl px-8 py-16 mx-auto lg:px-12 lg:w-3/5">
            <div className="w-full">
              <h1 className="text-2xl font-semibold tracking-wider capitalize ">
                Registrarme
              </h1>

              <p className="mt-4 ">
                Crea tu cuenta gratis para poder acceder a todos los productos.
              </p>

              <div className="my-6">
                <h1 className="">Escoje tu tipo de cuenta</h1>

                <div className="mt-3 md:flex md:items-center md:-mx-2">
                  <button className={isUser ? "text-white bg-black flex justify-center w-full px-6 py-3 rounded-lg md:w-auto md:mx-2 focus:outline-none" : "text-black bg-white border-2 border-black flex justify-center w-full px-6 py-3 rounded-lg md:w-auto md:mx-2 focus:outline-none"} onClick={() => setIsUser(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>

                    <span className="mx-2">
                      Usuario
                    </span>
                  </button>

                  <button className={isUser ? "border-2 border-black text-black bg-white flex justify-center w-full px-6 py-3 rounded-lg md:w-auto md:mx-2 focus:outline-none" : "text-white bg-black flex justify-center w-full px-6 py-3 rounded-lg md:w-auto md:mx-2 focus:outline-none"} onClick={() => setIsUser(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>

                    <span className="mx-2">
                      Vendedor
                    </span>
                  </button>
                </div>
              </div>

              <Formik
                initialValues={{
                  name: '',
                  username: '',
                  email: '',
                  password: '',
                  passwordConfirmation: ''
                }}
                validationSchema={SignupSchema}
                onSubmit={async (values, actions) => {
                  try {
                    await api.auth.register({ data: JSON.stringify({
                      name: values.name,
                      username: values.username,
                      email: values.email,
                      password: values.password,
                      passwordConfirmation: values.passwordConfirmation,
                      isUser: isUser
                    }) }
                    );
                    toast.success('Cuenta creada exitosamente');
                    navigate('/login')
                  } catch (error) {
                    toast.error('Error al crear la cuenta');
                  } finally {
                    actions.setSubmitting(false);
                  }

                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,

                  /* and other goodies */
                }) => (
                  <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                      <label className="block mb-2 text-sm ">Nombre completo</label>
                      <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        className='block w-full px-5 py-3 mt-2 border rounded-lg focus:outline-none focus:ring focus:ring-opacity-40'
                      />
                    </div>
                    {errors.name && touched.name && errors.name}

                    <div className='flex flex-col gap-2'>
                      <label className="block mb-2 text-sm ">Email</label>
                      <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        className='block w-full px-5 py-3 bg-white border focus:outline-none focus:ring focus:ring-opacity-40'
                      />
                    </div>
                    {errors.email && touched.email && errors.email}
                    <div className='flex flex-col gap-2'>
                      <label className="block mb-2 text-sm ">Nombre usuario</label>
                      <input
                        type="text"
                        name="username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                        className='block w-full px-5 py-3 mt-2 bg-white border focus:outline-none focus:ring focus:ring-opacity-40'
                      />
                    </div>
                    {errors.username && touched.username && errors.username}

                    <div className='flex flex-col gap-2'>
                      <label className="block mb-2 text-sm ">Password</label>
                      <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        className='block w-full px-5 py-3 mt-2 focus:outline-none focus:ring focus:ring-opacity-40'
                      />
                    </div>
                    {errors.password && touched.password && errors.password}

                    <div className='flex flex-col gap-2'>
                      <label className="block mb-2 text-sm ">Repetir contraseña</label>
                      <input
                        type="password"
                        name="passwordConfirmation"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.passwordConfirmation}
                        className='block w-full px-5 py-3 mt-2 focus:outline-none focus:ring focus:ring-opacity-40'
                      />
                    </div>
                    {errors.passwordConfirmation && touched.passwordConfirmation && errors.passwordConfirmation}

                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="w-4 h-4 rounded " />
                      <span className="text-sm ">Acepta nuestros terminos y condiciones</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="w-4 h-4 rounded " />
                      <span className="text-sm ">Quiere recibir promociones y descuentos a su email</span>
                    </div>

                    <button type="submit" disabled={isSubmitting} className='flex items-center justify-center px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-black rounded-lg w-[140px] cursor-pointer'>
                      Crear cuenta
                    </button>
                  </form>
                )}
              </Formik>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

SignUp.propTypes = {}

export default SignUp