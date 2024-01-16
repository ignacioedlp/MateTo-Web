import React, { useState } from 'react'
import { Button, Table, Popover, Badge } from 'keep-react'
import {
  Pencil, DotsThreeOutline, Trash, Crown, SmileySad, Cube
} from 'phosphor-react'

const makeSingular = (string) => {
  if (string.endsWith('es')) {
    return string.slice(0, -3) + 'r'
  } else if (string.endsWith('s')) {
    return string.slice(0, -1)
  } else {
    return string
  }
}

const TableSettings = ({ settings, headers, customColumn = null, title, settingName,
  handleAddSetting,
  handleDeleteSetting,
  handleUpdateSetting,
  DialogNewSetting,
  DialogEditSetting }) => {

  const [settingToEdit, setSettingToEdit] = useState(null)
  const [showModal, setShowModal] = useState(false);
  const [showModalX, setShowModalX] = useState(false);

  const open = () => {
    setShowModal(true);
  };
  const close = () => {
    setSettingToEdit(null);
    setShowModal(false);
  };

  const openX = () => {
    setShowModalX(true);
  };
  const closeX = () => {
    setSettingToEdit(null);
    setShowModalX(false);
  };

  return (

    <>
      <Table showCheckbox={true}>
        <Table.Caption>
          <div className="flex items-center justify-start gap-10 px-6 my-5">
            <div className="flex items-center gap-5">
              <p className="font-semibold capitalize text-body-1 text-metal-600">{title}</p>
            </div>
            <div className="flex items-center gap-5">
              <Button type="outlineGray" size="sm" onClick={() => {
                setShowModalX(true)

              }}>
                <span className="pr-2">
                  <Cube size={24} />
                </span>
                Crear {makeSingular(title)}
              </Button>
            </div>
          </div>
        </Table.Caption>
        <Table.Head>
          {
            headers.map((header, index) => (
              <Table.HeadCell className="min-w-[150px]" key={index}>
                <p className="font-medium uppercase text-body-6 text-metal-400">{header}</p>
              </Table.HeadCell>
            ))
          }
          {
            customColumn && <Table.HeadCell className="min-w-[290px]">
              <p className="font-medium uppercase text-body-6 text-metal-400">{customColumn}</p>
            </Table.HeadCell>
          }

          <Table.HeadCell className="min-w-[100px]" />
        </Table.Head>
        <Table.Body className="divide-y divide-gray-25">
          {
            settings?.map((setting, index) => (
              <Table.Row className="bg-white" key={index}>
                <Table.Cell>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div>
                          <p className="-mb-0.5 text-body-4 font-medium text-metal-600">{setting.id}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div>
                          <p className="-mb-0.5 text-body-4 font-medium text-metal-600 capitalize">{setting.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="inline-block">
                    {
                      setting.enabled ? (
                        <Badge colorType="light" color="success" icon={<Crown size={18} weight="light" />} iconPosition="left" onClick={() => { }}>
                          Activado
                        </Badge>
                      ) : (
                        <Badge colorType="light" color="error" icon={<SmileySad size={18} weight="light" />} iconPosition="left" onClick={() => { }}>
                          Desactivado
                        </Badge>
                      )
                    }
                  </div>
                </Table.Cell>
                {
                  customColumn &&
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full`} style={{ backgroundColor: setting[customColumn] }} >
                          </div>
                        </div>
                      </div>
                    </div>
                  </Table.Cell>
                }
                <Table.Cell>
                  <Popover showDismissIcon={false} showArrow={false} className="p-2 border w-52 border-metal-100">
                    <Popover.Container className="!mt-0 !block">
                      <ul>
                        <li className="px-2 py-1 rounded hover:bg-metal-100">
                          <button className="flex items-center justify-between w-full font-normal text-body-4 text-metal-600" onClick={() => {
                            handleDeleteSetting(settingName, setting.id)
                          }}>
                            <span>Delete</span>
                            <span>
                              <Trash />
                            </span>
                          </button>
                        </li>
                        <li className="px-2 py-1 rounded hover:bg-metal-100">
                          <button className="flex items-center justify-between w-full font-normal text-body-4 text-metal-600"
                            onClick={() => {
                              setSettingToEdit(setting)
                              setShowModal(true)
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
      {settingToEdit && <DialogEditSetting nameConfig={settingName} showModal={showModal} open={open} close={close} setting={settingToEdit} handleEditConfig={handleUpdateSetting} />}
      {showModalX && <DialogNewSetting nameConfig={settingName} showModal={showModalX} open={openX} close={closeX} handleAddConfig={handleAddSetting} />}
    </>
  )
}

export default TableSettings