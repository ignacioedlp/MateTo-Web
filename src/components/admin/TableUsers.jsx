import React from 'react'
import { Avatar, Table, Badge } from 'keep-react'
import { ArrowsDownUp, Crown } from 'phosphor-react'
import moment from 'moment'

const calculateLevel = (totalPurchases) => {
  if (totalPurchases < 100) {
    return <Badge colorType="light" color="error" icon={<Crown size={18} weight="light" />} iconPosition="left">Bronce</Badge>
  } else if (totalPurchases < 500) {
    return <Badge colorType="light" color="gray" icon={<Crown size={18} weight="light" />} iconPosition="left">Plata</Badge>
  } else if (totalPurchases < 1000) {
    return <Badge colorType="light" color="warning" icon={<Crown size={18} weight="light" />} iconPosition="left">Oro</Badge>
  } else if (totalPurchases < 5000) {
    return <Badge colorType="light" color="success" icon={<Crown size={18} weight="light" />} iconPosition="left">Platino</Badge>
  } else if (totalPurchases < 10000) {
    return <Badge colorType="light" color="info" icon={<Crown size={18} weight="light" />} iconPosition="left">Diamante</Badge>
  }
}

const TableUsers = ({ users }) => {

  return (

    <>
      <Table showCheckbox={true}>
        <Table.Caption>
          <div className="flex items-center justify-between px-6 my-5">
            <div className="flex items-center gap-5">
              <p className="font-semibold text-body-1 text-metal-600">Usuarios</p>
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

          <Table.HeadCell className="min-w-[150px]" icon={<ArrowsDownUp size={14} color="#8897AE" />}>
            Email
          </Table.HeadCell>
          <Table.HeadCell className="min-w-[150px]" icon={<ArrowsDownUp size={14} color="#8897AE" />}>
            Nivel
          </Table.HeadCell>
          <Table.HeadCell className="min-w-[100px]" />
        </Table.Head>
        <Table.Body className="divide-y divide-gray-25">
          {
            users?.map((user, index) => (
              <Table.Row className="bg-white" key={index}>
                <Table.Cell>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Avatar shape="circle" img={user.imageProfile || "https://img.freepik.com/premium-vector/avatar-profile-icon-vector-illustration_276184-165.jpg?w=50"} size="small" />
                        <div>
                          <p className="-mb-0.5 text-body-4 font-medium text-metal-600">{user.username}</p>
                          <span className="font-normal text-body-6 text-metal-500">{user.id}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <p className="font-medium text-body-5 text-metal-500">{moment(user.createdAt).format("DD-MM-YYYY")}</p>
                  <p className="font-normal text-body-6 text-metal-500">{moment(user.createdAt).format("HH:mm")}</p>
                </Table.Cell>
                <Table.Cell>
                  <p className="font-medium text-body-5 text-metal-500">{user.email}</p>
                </Table.Cell>
                <Table.Cell>
                  {calculateLevel(user.purchases.length)}
                </Table.Cell>
              </Table.Row>
            ))
          }

        </Table.Body>
      </Table>
    </>
  )
}

export default TableUsers