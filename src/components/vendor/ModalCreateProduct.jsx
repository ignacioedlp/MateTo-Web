import React, { Fragment, useState } from 'react'
import { Modal, Button } from "keep-react";
import { PencilSimpleLine, Check, CaretDown } from "phosphor-react";
import { Label} from "keep-react";
import { Listbox, Transition } from '@headlessui/react'
import { toast } from 'sonner';
import apiServices from '../../utils/apiServices';



const ModalCreateProduct = ({ showModal, close, settings }) => {

  const [selectedType, setSelectedType] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedColors, setSelectedColors] = useState([])
  const [selectedSizes, setSelectedSizes] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [files, setFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const handleFileChange = (event) => {
    setFiles([...event.target.files]);
  };

  const handleRemoveFile = (fileName) => {
    setFiles(files.filter(file => file.name !== fileName));
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

  return (
    <>
      <Modal
        icon={<PencilSimpleLine size={28} color="black" />}
        size="5xl"
        show={showModal}
        position="center"
      >
        <Modal.Header>Crear producto</Modal.Header>
        <Modal.Body>

          <div className="flex w-full gap-8 px-5">
            <div className='flex flex-col w-1/2 gap-4'>
              <div className='flex flex-col gap-1'>
                <Label htmlFor="#id-11" value="Titulo" />
                <input
                  id="#id-11"
                  placeholder="Default Input Field"
                  value={title}
                  color="gray"
                  onChange={(e) => {
                    setTitle(e.target.value)
                  }}
                />
              </div>
              <div className='flex flex-col gap-1'>
                <Label htmlFor="comment" value="Description" />
                <input
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
                <input
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
                    <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block capitalize truncate">{selectedCategory?.name}</span>
                      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <CaretDown
                          className="w-5 h-5 text-gray-400"
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
                      <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black/5 focus:outline-none sm:text-sm">
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
                                    <Check className="w-5 h-5" aria-hidden="true" />
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
                  <div className='flex justify-around w-full gap-4'>
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
                  <div className='grid w-full grid-cols-4 gap-4'>
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
                    <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block capitalize truncate">{selectedType?.name}</span>
                      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <CaretDown
                          className="w-5 h-5 text-gray-400"
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
                      <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black/5 focus:outline-none sm:text-sm">
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
                                    <Check className="w-5 h-5" aria-hidden="true" />
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
              <Label value="Imagenes" />
              <div className="flex flex-col items-center justify-center p-4 bg-gray-100">
                <input type="file" multiple onChange={handleFileChange} className="mb-4" />
                {files.length > 0 && (
                  <ul className="mb-4">
                    {files.map(file => (
                      <li key={file.name} className="flex items-center justify-between">
                        {file.name}
                        <button onClick={() => handleRemoveFile(file.name)} className="ml-4 text-red-500">Remove</button>
                      </li>
                    ))}
                  </ul>
                )}

              </div>
            </div>

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
          <Button onClick={async () => {
            try {
              setSubmitting(true);
              const formData = new FormData();
              files.forEach(file => {
                formData.append('images', file);
              });
              formData.append('title', title);
              formData.append('description', description);
              formData.append('price', price);
              formData.append('category', selectedCategory?.id);
              formData.append('published', true);
              formData.append('type', selectedType?.id);
              formData.append('colors', selectedColors);
              formData.append('sizes', selectedSizes);
              formData.append('stock', 100);

              await apiServices.products.createProduct({
                userAuthToken: localStorage.getItem('token'),
                data: formData
              }).request

              toast.success('Producto creado correctamente')

            } catch (error) {
              toast.error('No se pudo crear el producto')
            } finally {
              setSubmitting(false);
            }

          }} className='text-white bg-black hover:bg-black-500' disabled={submitting}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal >
    </>
  )
}

export default ModalCreateProduct