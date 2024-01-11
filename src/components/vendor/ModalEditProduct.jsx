import React, { Fragment, useState } from 'react'
import { Modal, Button } from "keep-react";
import { PencilSimpleLine, Check, CaretDown } from "phosphor-react";
import { Label, TextInput, Textarea } from "keep-react";
import { Listbox, Transition } from '@headlessui/react'
import { useSettings } from "../../provider/settingsProvider";
import { Switch } from '@headlessui/react'
import { useEffect } from 'react';
// Import React FilePond
import { FilePond } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';



const ModalEditProduct = ({ handleEditProduct, product, showModal, close, settings }) => {


  const [selectedType, setSelectedType] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedColors, setSelectedColors] = useState([])
  const [selectedSizes, setSelectedSizes] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [checked, setChecked] = useState(false)
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleAddColor = color => {
    if (selectedColors.find((selectedColor) => selectedColor === color)) {
      setSelectedColors(selectedColors.filter((selectedColor) => selectedColor !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  }

  const handleAddSize = size => {
    if (selectedSizes.find((selectedSize) => selectedSize === size)) {
      setSelectedSizes(selectedSizes.filter((selectedSize) => selectedSize !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  }

  useEffect(() => {
    setSelectedCategory(settings.productCategories?.find(type => type.id === product?.categoryId))
    setSelectedType(settings.productTypes?.find(type => type.id === product?.typeId))
    setChecked(product?.published)
    settings.colors?.map(color => {
      if (product?.colors.find(c => c.id == color.id)) {
        setSelectedColors([...selectedColors, color.id])
      }
      console.log(color)
    })
    settings.sizes?.map(size => {
      if (product?.sizes.find(s => s.id == size.id)) {
        setSelectedSizes([...selectedSizes, size.id])
      }
    })
    setTitle(product?.title)
    setDescription(product?.description)
    setPrice(product?.price)
  }, [product])

  return (
    <>
      <Modal
        icon={<PencilSimpleLine size={28} color="black" />}
        size="3xl"
        show={showModal}
        position="center"
      >
        <Modal.Header>Editar producto</Modal.Header>
        <Modal.Body>
          <div>
            <div className="flex w-full px-5 gap-8">
              <div className='flex flex-col w-1/2 gap-4'>
                <div className='flex flex-col gap-1'>
                  <Label htmlFor="#id-11" value="Titulo" />
                  <TextInput
                    id="#id-11"
                    placeholder="Default Input Field"
                    value={title}
                    color="gray"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <Label htmlFor="comment" value="Description" />
                  <Textarea
                    id="comment"
                    placeholder="Leave a comment..."
                    withBg={true}
                    value={description}
                    color="gray"
                    border={true}
                    rows={4}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <Label htmlFor="precio" value="Precio" />
                  <TextInput
                    id="precio"
                    placeholder="Default Input Field"
                    value={price}
                    color="gray"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
            
            
                <div>
                  <Label value="Tipo de producto" />
                  <Listbox value={selectedCategory} onChange={setSelectedCategory}>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate capitalize">{selectedCategory?.name}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <CaretDown
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                          {settings.productCategories?.map((person, personIdx) => (
                            <Listbox.Option
                              key={personIdx}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                }`
                              }
                              value={person}
                            >
                              {({ selectedCategory }) => (
                                <>
                                  <span
                                    className={`block capitalize truncate ${selectedCategory ? 'font-medium' : 'font-normal'
                                      }`}
                                  >
                                    {person.name}
                                  </span>
                                  {selectedCategory ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                      <Check className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>
            
            
              </div>
              <div className='flex flex-col w-1/2 gap-4'>
                <div>
                  <Label value="Tamaños" />
                  <div className='flex flex-col items-center justify-between w-full gap-4 py-5 '>
                    <div className='flex gap-4 justify-around w-full'>
                      {
                        settings.sizes?.map((size) => (
                          <div
                            className={`flex items-center justify-center w-[61px] h-8 rounded-lg opacity-80 cursor-pointer0" 
            
                            ${selectedSizes?.includes(size.id) ? `border-2 border-stone-700` : 'border border-[#8A8989]'}`}
                            onClick={() => handleAddSize(size.id)}
                            key={size.id}
                          >
                            <p className={`text-[14px] font-semibold text-center text-[#8A8989] font-inter ${selectedSizes?.includes(size.id) ? ` text-stone-700` : ''}`}>{size.name}</p>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
                <div>
                  <Label value="Colores" />
                  <div className='flex flex-col items-center justify-between w-full gap-4 py-5 '>
                    <div className='grid grid-cols-4 gap-4 w-full'>
                      {
                        settings.colors?.map((color) => (
                          <div className='flex flex-col items-center justify-center ' key={color.id}>
                            <div
                              className={`flex items-center justify-center w-9 h-9 rounded-[12px] cursor-pointer
                            ${selectedColors.includes(color.id) ? `border-2 p-1` : ''}`}
                              style={{ backgroundColor: color.hex }}
                              onClick={() => handleAddColor(color.id)}
                            >
                              {selectedColors.includes(color.id) && (
                                <div className={`w-3 h-3 bg-stone-300 rounded-full`}></div>
                              )}
                            </div>
                            <p className='text-[14px] font-semibold text-center text-[#8A8989] font-inter capitalize'>{color.name}</p>
                          </div>
                        ))
                      }
                    </div>
                  </div>
            
                </div>
                <div>
                  <Label value="Categoria" />
                  <Listbox value={selectedType} onChange={setSelectedType}>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate capitalize">{selectedType?.name}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <CaretDown
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                          {settings.productTypes?.map((person, personIdx) => (
                            <Listbox.Option
                              key={personIdx}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                }`
                              }
                              value={person}
                            >
                              {({ selectedCategory }) => (
                                <>
                                  <span
                                    className={`block capitalize truncate ${selectedCategory ? 'font-medium' : 'font-normal'
                                      }`}
                                  >
                                    {person.name}
                                  </span>
                                  {selectedCategory ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                      <Check className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>
              </div>
              
            </div>
            <FilePond
                files={files}
                onupdatefiles={setFiles}
                allowMultiple={true}
                maxFiles={3}
                name="files"
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            />
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button type="outlineGray" onClick={() => {
            setSelectedCategory(null)
            setSelectedType(null)
            setSelectedColors([])
            setSelectedSizes([])
            setTitle("")
            setDescription("")
            setPrice(0)
            close()

          }}>
            Cancel
          </Button>
          <Button onClick={close} className='bg-black text-white hover:bg-black-500' >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal >
    </>
  )
}

export default ModalEditProduct