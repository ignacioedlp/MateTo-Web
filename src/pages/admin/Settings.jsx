import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import SideBar from '../../components/admin/SideBar';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../provider/authProvider';
import api from '../../utils/apiServices';
import { Tabs } from "keep-react";
import { FaUserAlt } from "react-icons/fa";
import { MdCategory, MdOutlineFormatSize } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { useSettings } from '../../provider/settingsProvider';
import TableSettings from '../../components/admin/TableSettings';
import DialogEditSetting from '../../components/admin/DialogEditSetting';
import DialogNewSetting from '../../components/admin/DialogNewSetting';


function Settings() {

  const navigate = useNavigate();
  const { token } = useAuth();
  const { settings, refreshSettings } = useSettings();

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      const response = await api.roles.getRoles({
        userAuthToken: token,
      }).request

      setRoles(response.data)
    }
    fetchRoles()
  }, [])


  const handleAddSetting = async (settingName, data) => {
    await api[settingName].add({
      userAuthToken: token,
      data
    })

    await refreshSettings()
  }

  const handleDeleteSetting = async (settingName, id) => {
    await api[settingName].delete({
      userAuthToken: token,
      id
    })

    await refreshSettings()
  }

  const handleUpdateSetting = async (settingName, id, data) => {
    await api[settingName].edit({
      userAuthToken: token,
      id,
      data
    })

    await refreshSettings()
  }


  const handleAddRoles = async (settingName, data) => {
    await api.roles.add({
      userAuthToken: token,
      data
    })
    const response = await api.roles.getRoles({
      userAuthToken: token,
    }).request

    setRoles(response.data)
  }


  return (
    <div className='flex flex-col gap-2'>
      <Navbar />
      <div className='flex '>
        <SideBar page={"Settings"} />
        <div className='container flex justify-center w-full mx-auto'>
          <Tabs
            aria-label="Tabs"
            style="default"
            borderPosition="bottom"
            iconPosition="left"
            className='w-full'
          >
            <Tabs.Item
              title={<h3 className='text-black focus:bg-red-600'>Colores</h3>}
              icon={<HiOutlineColorSwatch size={20} color='black' />} >
              <div className='w-full'>
                <TableSettings
                  headers={['id', 'name', 'enabled']}
                  settings={settings.colors}
                  customColumn="hex"
                  columnName="hex"
                  title="colores"
                  settingName="colors"
                  handleAddSetting={handleAddSetting}
                  handleDeleteSetting={handleDeleteSetting}
                  handleUpdateSetting={handleUpdateSetting}
                  DialogNewSetting={DialogNewSetting}
                  DialogEditSetting={DialogEditSetting}
                />
              </div>
            </Tabs.Item>
            <Tabs.Item title={<h3 className='text-black'>Categorias</h3>} icon={<MdCategory size={20} color='black' />} >
              <div className='w-full'>
                <TableSettings
                  headers={['id', 'name', 'enabled']}
                  settings={settings.productCategories}
                  title="categorias"
                  settingName="productCategories"
                  handleAddSetting={handleAddSetting}
                  handleDeleteSetting={handleDeleteSetting}
                  handleUpdateSetting={handleUpdateSetting}
                  DialogNewSetting={DialogNewSetting}
                  DialogEditSetting={DialogEditSetting}
                />
              </div>
            </Tabs.Item>
            <Tabs.Item title={<h3 className='text-black'>Tipos</h3>} icon={<BiCategory size={20} color='black' />} >
              <div className='w-full'>
                <TableSettings
                  headers={['id', 'name', 'enabled']}
                  settings={settings.productTypes}
                  title="tipos"
                  settingName="productTypes"
                  handleAddSetting={handleAddSetting}
                  handleDeleteSetting={handleDeleteSetting}
                  handleUpdateSetting={handleUpdateSetting}
                  DialogNewSetting={DialogNewSetting}
                  DialogEditSetting={DialogEditSetting}
                />
              </div>
            </Tabs.Item>
            <Tabs.Item title={<h3 className='text-black'>Tamaños</h3>} icon={<MdOutlineFormatSize size={20} color='black' />} >
              <div className='w-full'>
                <TableSettings
                  headers={['id', 'name', 'enabled']}
                  settings={settings.sizes}
                  title="tamaños"
                  settingName="sizes"
                  handleAddSetting={handleAddSetting}
                  handleDeleteSetting={handleDeleteSetting}
                  handleUpdateSetting={handleUpdateSetting}
                  DialogNewSetting={DialogNewSetting}
                  DialogEditSetting={DialogEditSetting}
                />
              </div>
            </Tabs.Item>
            <Tabs.Item title={<h3 className='text-black'>Roles</h3>} icon={<FaUserAlt size={20} color='black' />} >
              <div className='w-full'>
                <TableSettings
                  headers={['id', 'name', 'enabled']}
                  settings={roles}
                  title="roles"
                  settingName="roles"
                  handleAddSetting={handleAddRoles}
                  handleDeleteSetting={handleDeleteSetting}
                  handleUpdateSetting={handleUpdateSetting}
                // dialogCreate={DialogNewSetting}
                // dialogUpdate={DialogEditSetting}
                />
              </div>
            </Tabs.Item>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Settings