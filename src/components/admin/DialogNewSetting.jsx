import React, { Fragment, useState } from 'react'
import { Modal, Button } from "keep-react";
import { PencilSimpleLine, Check, CaretDown } from "phosphor-react";
import { Label, TextInput, Textarea } from "keep-react";
import { Listbox, Transition } from '@headlessui/react'
import { useSettings } from "../../provider/settingsProvider";
import { Switch } from '@headlessui/react'
import { useEffect } from 'react';
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

  const [newSetting, setNewSetting] = useState({})

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
          onSubmit={(values, { resetForm }) => {
            handleAddConfig(nameConfig, values);
            resetForm();
            close();
          }}
        >
          {({ errors, touched }) => (
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
                <button type="outlineGray" onClick={close} className="mr-2">
                  Cancel
                </button>
                <button type="submit" className='text-white bg-black hover:bg-black-500'>
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