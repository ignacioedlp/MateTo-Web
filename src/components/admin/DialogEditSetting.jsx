import React from 'react'
import { Modal } from "keep-react";
import { PencilSimpleLine} from "phosphor-react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const formsConfigs = {
  'colors': {
    'name': 'string',
    'hex': 'string',
  },
  'sizes': {
    'name': 'string',
  },
  'productCategories': {
    'name': 'string',
  },
  'productTypes': {
    'name': 'string',
  },
}

const SettingSchema = Yup.object().shape({
  // Define validation for each field based on your requirements
  name: Yup.string().required('Required'),
  hex: Yup.string(), // Add more validations as needed
  // Add other fields here
});

const DialogEditSetting = ({ nameConfig, handleEditConfig, setting, showModal, close }) => {

  return (
    <Modal
      icon={<PencilSimpleLine size={28} color="black" />}
      size="3xl"
      show={showModal}
      position="center"
    >
      <Modal.Header>Editar setting</Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={setting}
          validationSchema={SettingSchema}
          onSubmit={async (values) => {
            await handleEditConfig(nameConfig, setting.id, values);
            close();
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              {Object.keys(formsConfigs[nameConfig]).map((key, index) => (
                <div className="mb-4 form-group" key={index}>
                  <label htmlFor={key} className="block text-sm font-medium text-gray-700">{key}</label>
                  <Field id={key} name={key} className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                  {errors[key] && touched[key] ? (
                    <div className="text-xs italic text-red-500">{errors[key]}</div>
                  ) : null}
                </div>
              ))}
              <div className='flex flex-row gap-4'>
                <button className='px-4 py-2 mr-2 border border-black rounded-lg'>
                  Cancel
                </button>
                <button type="submit" className='px-4 py-2 text-white bg-black rounded-lg' disabled={isSubmitting}>
                  Confirm
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal >
  )
}

export default DialogEditSetting