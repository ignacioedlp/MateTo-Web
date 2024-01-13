import React from 'react'
import PropTypes from 'prop-types'
import Navbar from '../../components/Navbar'
import MatePhoto from '../../assets/image1.png'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../provider/authProvider';
import api from '../../utils/apiServices';
import { toast } from 'sonner';

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required('Required'),
});

const Login = props => {
  const { setToken, setUser } = useAuth();
  return (
    <>
      <Navbar />
      <div className="bg-white ">
        <div className="flex justify-center min-h-screen">
          <div className="hidden bg-cover lg:block lg:w-2/5">
            <img src={MatePhoto} alt="unsplash random" className="object-cover w-full h-full" />
          </div>

          <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
            <div className="w-full">
              <h1 className="text-2xl font-semibold tracking-wider capitalize ">
                Iniciar sesion
              </h1>

              <p className="my-4 ">
                Inicia sesion para poder acceder a todos los productos.
              </p>

              <Formik
                initialValues={{
                  email: '',
                  password: '',
                }}
                validationSchema={SignInSchema}
                onSubmit={async (values, actions) => {
                  try {
                    const response = await api.auth.login({
                      data: {
                        email: values.email,
                        password: values.password,
                      }
                    }
                    ).request
                    toast.success('Sesion iniciada correctamente 🚀 ');

                    setToken(response.data.token);
                    setUser(response.data.user);

                  } catch (error) {
                    toast.error('Error al iniciar sesion');
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
                      <label className="block mb-2 text-sm ">Email</label>
                      <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        className='block w-full px-5 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-opacity-40'
                      />
                    </div>
                    {errors.email && touched.email && errors.email}
                    <div className='flex flex-col gap-2'>
                      <label className="block mb-2 text-sm ">Password</label>
                      <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        className='block w-full px-5 py-3 mt-2 border focus:outline-none focus:ring focus:ring-opacity-40'
                      />
                    </div>
                    {errors.password && touched.password && errors.password}
                    <button type="submit" disabled={isSubmitting} className='flex items-center justify-center px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-black rounded-lg w-[140px]'>
                      Ingresar
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

Login.propTypes = {}

export default Login