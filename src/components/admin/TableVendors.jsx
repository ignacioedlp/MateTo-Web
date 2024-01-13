import React from 'react'
import { Avatar, Button, Table } from 'keep-react'
import { ArrowsDownUp } from 'phosphor-react'
import moment from 'moment'

const TableVendors = ({ vendors }) => {

  return (

    <>
      <Table showCheckbox={true}>
        <Table.Caption>
          <div className="flex items-center justify-between px-6 my-5">
            <div className="flex items-center gap-5">
              <p className="font-semibold text-body-1 text-metal-600">Vendedores</p>
            </div>
          </div>
        </Table.Caption>
        <Table.Head>
          <Table.HeadCell className="min-w-[290px]">
            <p className="font-medium text-body-6 text-metal-400">Nombre</p>
          </Table.HeadCell>
          <Table.HeadCell className="min-w-[183px]" icon={<ArrowsDownUp size={14} color="#8897AE" />}>
            Fecha de creacion
          </Table.HeadCell>
          <Table.HeadCell className="min-w-[160px]" icon={<ArrowsDownUp size={14} color="#8897AE" />}>
            Usuario
          </Table.HeadCell>
          <Table.HeadCell className="min-w-[100px]" />
        </Table.Head>
        <Table.Body className="divide-y divide-gray-25">
          {
            vendors?.map((vendor, index) => (
              <Table.Row className="bg-white">
                <Table.Cell>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Avatar shape="circle" img={vendor.imageProfile || "https://img.freepik.com/premium-vector/avatar-profile-icon-vector-illustration_276184-165.jpg?w=50"} size="small" />
                        <div>
                          <p className="-mb-0.5 text-body-4 font-medium text-metal-600">{vendor.username}</p>
                          <span className="font-normal text-body-6 text-metal-500">{vendor.id}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <p className="font-medium text-body-5 text-metal-500">{moment(vendor.createdAt).format("DD-MM-YYYY")}</p>
                  <p className="font-normal text-body-6 text-metal-500">{moment(vendor.createdAt).format("HH:mm")}</p>
                </Table.Cell>
                <Table.Cell>
                  <p className="font-medium text-body-5 text-metal-500">{vendor.email}</p>
                </Table.Cell>
              </Table.Row>
            ))
          }

        </Table.Body>
      </Table>
    </>
  )
}

export default TableVendors