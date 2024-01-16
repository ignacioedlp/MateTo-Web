import React, { useState, useEffect } from 'react'
import { Avatar, Sidebar, Skeleton } from "keep-react";
import {
  ShoppingBagOpen,
  User,
} from "phosphor-react";
import Navbar from '../../components/Navbar'
import { HiOutlineLogout } from "react-icons/hi";
import { useAuth } from '../../provider/authProvider'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import apiServices from '../../utils/apiServices';
import { Modal, Button } from "keep-react";
import { CloudArrowUp } from "phosphor-react";
import { Formik } from 'formik';

export const SkeletonComponent = () => {
  return (
    <div className="max-w-xl py-5">
      <Skeleton animation={true}>
        <div className="w-1/3">
          <Skeleton.Line height="h-6" />
        </div>
        <div className="w-3/5">
          <Skeleton.Line height="h-4" />
        </div>
      </Skeleton>
    </div>
  );
}

const Profile = () => {

  const { token, clearAuth } = useAuth();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [infoEnabled, setInfoEnabled] = useState({
    name: false,
    email: false,
    username: false,
  });
  const [showModal, setShowModal] = useState(false);
  const [showModalPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState(null);
  const onClickOne = () => {
    setShowModal(!showModal);
  };

  const onClickPassword = () => {
    setShowPassword(!showModalPassword);
  };

  const handleLogout = () => {
    delete axios.defaults.headers.common["Authorization"];
    clearAuth();
    navigate('/login');
  }

  useEffect(() => {
    const getInformation = async () => {
      const response = await apiServices.profile.getProfile({
        userAuthToken: token
      }).request
      setUser(response.data);
    }
    getInformation();
  }, [])

  const handleFileChange = (event) => {
    setFile(...event.target.files);
  };

  const handleUpdateProfile = async () => {
    const formData = new FormData();

    if (file) {
      formData.append("image", file);
    }

    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("username", user.username);


    const response = await apiServices.profile.updateProfile({
      userAuthToken: token,
      data: formData
    }).request
    setUser(response.data);

  }


  return (
    <div className='flex flex-col gap-2'>
      <Navbar />
      <div className='container flex mx-auto'>
        <Sidebar aria-label="Sidebar with multi-level dropdown example" className='w-[200px]'>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/profile" icon={<User size={24} />}>
              Mi informacion
            </Sidebar.Item>
            <Sidebar.Item href="/purchases" icon={<ShoppingBagOpen size={24} />}>
              Compras
            </Sidebar.Item>
            <Sidebar.Item onClick={() => handleLogout()} icon={<HiOutlineLogout size={24} />}>
              Cerrar sesion
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar>
        <div className='container mx-10 mt-10'>
          <div className="flex items-center justify-between w-full">
            <div>
              <h2 className='text-lg font-thin'>Mi informacion</h2>
              <h4 className='font-thin text-md'>Detalles</h4>
            </div>
            <div className='flex flex-col items-center justify-center gap-1'>
              <Avatar img={user?.imageProfile} alt="" className={`object-cover w-16 h-16 rounded-xl ${"border-2 border-white"}`} />
              <button className='text-[#3C4242] font-semibold text-lg ' onClick={onClickOne}>Cambiar</button>
            </div>
          </div>
          <div className='flex flex-col gap-6 mt-10'>
            {
              user ? (
                <div className='flex items-center justify-between w-full'>
                  <div>
                    <h5 className="text-[#807D7E] font-semibold text-base">Nombre</h5>

                    <div className={`text-[#3C4242] font-semibold text-lg ${infoEnabled.name ? 'border-b-2 border-black p-2 ' : ''}`}>
                      <input type="text" className={`text-[#3C4242] font-semibold text-lg`} value={user.name} disabled={!infoEnabled.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                    </div>
                  </div>
                  <button className='text-[#3C4242] font-semibold text-lg ' onClick={() => setInfoEnabled({ ...infoEnabled, name: !infoEnabled.name })}>Cambiar</button>
                </div>
              ) : (<SkeletonComponent />)
            }
            {
              user ? (
                <div className='flex items-center justify-between w-full'>
                  <div>
                    <h5 className="text-[#807D7E] font-semibold text-base">Email</h5>
                    <div className={`text-[#3C4242] font-semibold text-lg ${infoEnabled.email ? 'border-b-2 border-black p-2 ' : ''}`}>
                      <input type="text" className={`text-[#3C4242] font-semibold text-lg`} value={user.email} disabled={!infoEnabled.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                    </div>
                  </div>
                  <button className='text-[#3C4242] font-semibold text-lg ' onClick={() => setInfoEnabled({ ...infoEnabled, email: !infoEnabled.email })}>Cambiar</button>
                </div>
              ) : (<SkeletonComponent />)
            }
            {
              user ? (
                <div className='flex items-center justify-between w-full'>
                  <div>
                    <h5 className="text-[#807D7E] font-semibold text-base">Usuario</h5>
                    <div className={`text-[#3C4242] font-semibold text-lg ${infoEnabled.username ? 'border-b-2 border-black p-2 ' : ''}`}>
                      <input type="text" className={`text-[#3C4242] font-semibold text-lg`} value={user.username} disabled={!infoEnabled.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
                    </div>
                  </div>
                  <button className='text-[#3C4242] font-semibold text-lg ' onClick={() => setInfoEnabled({ ...infoEnabled, username: !infoEnabled.username })}>Cambiar</button>
                </div>
              ) : (<SkeletonComponent />)
            }
            {
              user ? (
                <div className='flex items-center justify-between w-full'>
                  <div>
                    <h5 className="text-[#807D7E] font-semibold text-base">Password</h5>
                    <p className="text-[#3C4242] font-semibold text-lg">********</p>
                  </div>
                  <button className='text-[#3C4242] font-semibold text-lg ' onClick={onClickPassword}>Cambiar</button>
                </div>
              ) : (<SkeletonComponent />)
            }
          </div>
          <div className='mt-10 '>
            <button className='px-4 py-2 text-white bg-black rounded-lg' onClick={handleUpdateProfile}>
              Guardar
            </button>
          </div>
        </div>

      </div>

      <Modal
        icon={<CloudArrowUp size={28} color="#1B4DFF" />}
        size="md"
        show={showModal}
        position="center"
      >
        <Modal.Header>Selecciona una foto para tu perfil</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="leading-relaxed text-body-5 md:text-body-4 text-metal-500">
              Selecciona una foto para tu perfil
            </p>
            <input type="file" onChange={handleFileChange} className="mb-4" />
            <ul className="mb-4">
              <li key={file?.name} className="flex items-center justify-between">
                {file?.name}
              </li>
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="outlineGray" onClick={() => {
            setFile(null)
            onClickOne()
          }}>
            Cancel
          </Button>
          <Button type="primary" onClick={onClickOne}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        icon={<CloudArrowUp size={28} color="#1B4DFF" />}
        size="md"
        show={showModalPassword}
        position="center"
      >
        <Modal.Header>Cambia tu contraseña</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <Formik initialValues={{ email: '', newPassword: '', oldPassword: '', passwordConfirmation: '' }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = 'Required';
                }
                if (!values.newPassword) {
                  errors.newPassword = 'Required';
                }
                if (!values.oldPassword) {
                  errors.oldPassword = 'Required';
                }
                if (!values.passwordConfirmation) {
                  errors.passwordConfirmation = 'Required';
                }
                if (values.passwordConfirmation !== values.newPassword) {
                  errors.passwordConfirmation = 'Las contraseñas no coinciden';
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                await apiServices.auth.changePassword({
                  userAuthToken: token,
                  data: values
                }).request
                setSubmitting(false);
                setShowPassword(false);
              }}

            >
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, resetForm }) => (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <p className="leading-relaxed text-body-5 md:text-body-4 text-metal-500">
                      Cambia tu contraseña
                    </p>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      placeholder="Email"
                      className={`w-full px-4 py-2 text-body-5 md:text-body-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 ${errors.email && touched.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && touched.email && <div className="text-red-500">{errors.email}</div>}<input
                      type="password"
                      name="oldPassword"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.oldPassword}
                      placeholder="Contraseña actual"
                      className={`w-full px-4 py-2 text-body-5 md:text-body-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 ${errors.oldPassword && touched.oldPassword ? 'border-red-500' : ''}`}
                    />
                    {errors.oldPassword && touched.oldPassword && <div className="text-red-500">{errors.oldPassword}</div>}
                    <input
                      type="password"
                      name="newPassword"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.newPassword}
                      placeholder="Nueva contraseña"
                      className={`w-full px-4 py-2 text-body-5 md:text-body-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 ${errors.newPassword && touched.newPassword ? 'border-red-500' : ''}`}
                    />
                    {errors.newPassword && touched.newPassword && <div className="text-red-500">{errors.newPassword}</div>}
                    <input
                      type="password"
                      name="passwordConfirmation"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.passwordConfirmation}
                      placeholder="Confirmar contraseña"
                      className={`w-full px-4 py-2 text-body-5 md:text-body-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 ${errors.passwordConfirmation && touched.passwordConfirmation ? 'border-red-500' : ''}`}
                    />
                    {errors.passwordConfirmation && touched.passwordConfirmation && <div className="text-red-500">{errors.passwordConfirmation}</div>}

                  </div>
                  <div className="flex justify-end gap-4 mt-6">
                    <button className="px-4 py-2 border border-black rounded-lg" onClick={() => {
                      resetForm()
                      onClickPassword()
                    }}>
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 text-white bg-black rounded-lg"
                    >
                      Guardar
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </Modal.Body>
      </Modal>
    </div >
  )
}

Profile.propTypes = {}

export default Profile