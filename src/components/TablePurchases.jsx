import React from 'react'
import { Table } from 'keep-react'
import { ArrowsDownUp } from 'phosphor-react'
import moment from 'moment'


const TablePurchases = ({ purchases }) => {

  return (

    <>
      <Table showCheckbox={true}>
        <Table.Caption>
          <div className="flex items-center justify-between px-6 my-5">
            <div className="flex items-center gap-5">
              <p className="font-semibold text-body-1 text-metal-600">Tus compras</p>
            </div>
          </div>
        </Table.Caption>
        <Table.Head>
          <Table.HeadCell className="min-w-[290px]">
            <p className="font-medium text-body-6 text-metal-400">ID</p>
          </Table.HeadCell>
          <Table.HeadCell className="min-w-[183px]" icon={<ArrowsDownUp size={14} color="#8897AE" />}>
            Fecha de creacion
          </Table.HeadCell>
          <Table.HeadCell className="min-w-[160px]" icon={<ArrowsDownUp size={14} color="#8897AE" />}>
            Cantidad
          </Table.HeadCell>
          <Table.HeadCell className="min-w-[160px]" icon={<ArrowsDownUp size={14} color="#8897AE" />}>
            Total
          </Table.HeadCell>
          <Table.HeadCell className="min-w-[100px]" />
        </Table.Head>
        <Table.Body className="divide-y divide-gray-25">
          {
            purchases?.map((purchase, index) => (

              <Table.Row className="bg-white" key={index}>

                <Table.Cell>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div>
                          <p className="-mb-0.5 text-body-4 font-medium text-metal-600">{purchase?.id}</p>
                          <span className="font-normal text-body-6 text-metal-500">{purchase?.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <p className="font-medium text-body-5 text-metal-500">{moment(purchase?.createdAt).format("DD-MM-YYYY")}</p>
                  <p className="font-normal text-body-6 text-metal-500">{moment(purchase?.createdAt).format("HH:mm")}</p>
                </Table.Cell>
                <Table.Cell>
                  <p className="font-medium text-body-5 text-metal-500">{purchase?.purchaseItems?.reduce((acc, item) => acc + item.quantity, 0)}</p>
                </Table.Cell>
                <Table.Cell>
                  <p className="font-medium text-body-5 text-metal-500">{
                    purchase?.purchaseItems?.reduce((acc, item) => acc + (item.quantity * item.product.price), 0)
                  }</p>
                </Table.Cell>

              </Table.Row>
            ))
          }

        </Table.Body>
      </Table>
    </>
  )
}

export default TablePurchases