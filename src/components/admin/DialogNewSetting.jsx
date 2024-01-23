import React from 'react'
import { Modal } from "keep-react";
import { PencilSimpleLine } from "phosphor-react";
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

const NewSettingSchema = Yup.object().shape({
  // Validation rules here
  name: Yup.string().required('Required'),
  hex: Yup.string(), // Add more as needed
  // Other fields...
});

const DialogNewSetting = ({ nameConfig, handleAddConfig, showModal, close }) => {

  return (
    <Modal
      icon={<PencilSimpleLine size={28} color="black" />}
      size="3xl"
      show={showModal}
      position="center"
    >
      <Modal.Header>Crear setting</Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ /* initial values based on formsConfigs */ }}
          validationSchema={NewSettingSchema}
          onSubmit={async (values, { resetForm }) => {
            await handleAddConfig(nameConfig, values);
            resetForm();
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
                <button className='px-4 py-2 mr-2 border border-black rounded-lg' onClick={close}>
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
    </Modal>
  )
}

export default DialogNewSetting