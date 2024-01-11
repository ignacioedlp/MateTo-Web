import React, { useState } from 'react'
import { Avatar, Badge, Button, Popover, Table } from 'keep-react'
import { ArrowsDownUp, Crown, Cube, DotsThreeOutline, Pencil, Trash, SmileySad } from 'phosphor-react'
import moment from 'moment'
import ModalEditProduct from './ModalEditProduct'
import ModalCreateProduct from './ModalCreateProduct'

const TableProducts = ({ products, handleUpdateProduct, handleDeleteProduct, settings, handleCreateProduct }) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalX, setShowModalX] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const open = () => {
    setShowModal(true);
  };
  const close = () => {
    setProductToEdit(null);
    setShowModal(false);
  };

  const openX = () => {
    setShowModalX(true);
  };
  const closeX = () => {
    setProductToEdit(null);
    setShowModalX(false);
  };

  return (

    <>
      <Table showCheckbox={true}>
        <Table.Caption>
          <div className="flex items-center justify-between px-6 my-5">
            <div className="flex items-center gap-5">
              <p className="font-semibold text-body-1 text-metal-600">Tus productos</p>
            </div>
            <div className="flex items-center gap-5">
              <Button type="outlineGray" size="sm" onClick={() => {
                setShowModalX(true)

              }}>
                <span className="pr-2">
                  <Cube size={24} />
                </span>
                Crear producto
              </Button>
            </div>
          </div>
        </Table.Caption>
        <Table.Head>
          <Table.HeadCell className="min-w-[290px]">
            <p className="font-medium text-body-6 text-metal-400">Titulo</p>
          </Table.HeadCell>
          <Table.HeadCell className="min-w-[183px]" icon={<ArrowsDownUp size={14} color="#8897AE" />}>
            Fecha de creacion
          </Table.HeadCell>
          <Table.HeadCell className="min-w-[160px]" icon={<ArrowsDownUp size={14} color="#8897AE" />}>
            Monto
          </Table.HeadCell>
          <Table.HeadCell className="min-w-[150px]" icon={<ArrowsDownUp size={14} color="#8897AE" />}>
            Estado
          </Table.HeadCell>
          <Table.HeadCell className="min-w-[100px]" />
        </Table.Head>
        <Table.Body className="divide-y divide-gray-25">
          {
            products?.map((product, index) => (
              <Table.Row className="bg-white">
                <Table.Cell>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Avatar shape="circle" img={product.imageUrls[0]} size="md" />
                        <div>
                          <p className="-mb-0.5 text-body-4 font-medium text-metal-600">{product.title}</p>
                          <span className="font-normal text-body-6 text-metal-500">{product.description.slice(0, 100)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <p className="font-medium text-body-5 text-metal-500">{moment(product.createdAt).format("DD-MM-YYYY")}</p>
                  <p className="font-normal text-body-6 text-metal-500">{moment(product.createdAt).format("HH:mm")}</p>
                </Table.Cell>
                <Table.Cell>
                  <p className="font-medium text-body-5 text-metal-500">${product.price.toFixed(2)}</p>
                </Table.Cell>
                <Table.Cell>
                  <div className="inline-block">
                    {
                      product.published ? (
                        <Badge colorType="light" color="success" icon={<Crown size={18} weight="light" />} iconPosition="left" onClick={() => handleUpdateProduct(product.id, { published: false })}>
                          Publicado
                        </Badge>
                      ) : (
                        <Badge colorType="light" color="error" icon={<SmileySad size={18} weight="light" />} iconPosition="left" onClick={() => handleUpdateProduct(product.id, { published: true })}>
                          No publicado
                        </Badge>
                      )
                    }
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Popover showDismissIcon={false} showArrow={false} className="p-2 border w-52 border-metal-100">
                    <Popover.Container className="!mt-0 !block">
                      <ul>
                        <li className="px-2 py-1 rounded hover:bg-metal-100">
                          <button className="flex items-center justify-between w-full font-normal text-body-4 text-metal-600" onClick={() => handleDeleteProduct(product.id)}>
                            <span>Delete</span>
                            <span>
                              <Trash />
                            </span>
                          </button>
                        </li>
                        <li className="px-2 py-1 rounded hover:bg-metal-100">
                          <button className="flex items-center justify-between w-full font-normal text-body-4 text-metal-600"
                            onClick={() => {
                              setShowModal(true)
                              setProductToEdit(product)
                            }}
                          >
                            <span>Edit</span>
                            <span>
                              <Pencil />
                            </span>
                          </button>
                        </li>
                      </ul>
                    </Popover.Container>
                    <Popover.Action>
                      <Button type="outlineGray" size="xs" circle={true}>
                        <DotsThreeOutline size={14} color="#5E718D" weight="bold" />
                      </Button>
                    </Popover.Action>
                  </Popover>
                </Table.Cell>
              </Table.Row>
            ))
          }

        </Table.Body>
      </Table>
      <ModalEditProduct showModal={showModal} settings={settings} open={open} close={close} product={productToEdit} handleEditProduct={handleUpdateProduct} />
      <ModalCreateProduct showModal={showModalX} settings={settings} open={openX} close={closeX} handleCreateProduct={handleCreateProduct} />
    </>
  )
}

export default TableProducts