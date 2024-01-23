import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import SideBar from '../../components/vendor/SideBar';
import { Statistic, AreaChart } from "keep-react";
import { useAuth } from '../../provider/authProvider';
import api from '../../utils/apiServices';
import { Badge, Table } from "keep-react";

function calculateTotal(orders) {
  let total = 0
  orders.forEach(order => {
    let totalOrder = order.products.reduce((total, product) => {
      return total + (product.price * product.quantity);
    }, 0);

    total += totalOrder
  })
  return total
}

function calculateTotalQuantity(orders) {
  let total = 0
  orders.forEach(order => {
    let totalOrder = order.products.reduce((total, product) => {
      return total + product.quantity;
    }, 0);

    total += totalOrder
  })
  return total
}

function calculateUniqueUsers(orders) {
  const uniqueUsers = new Set();
  orders.forEach(order => {
    uniqueUsers.add(order.userId);
  });
  return uniqueUsers.size;
}

const calculateStock = (stock) => {
  if (stock <= 0) {
    return (
      <Badge color="error" rounded="true">
        Agotado
      </Badge>
    );
  } else if (stock <= 50) {
    return (
      <Badge color="warning" rounded="true">
        {stock} en stock
      </Badge>
    );
  } else {
    return (
      <Badge color="success" rounded="true">
        {stock} en stock
      </Badge>
    );
  }
}

function Dashboard() {

  const { token } = useAuth();

  const [totalSales, setTotalSales] = useState(0)
  const [totalQuantity, setTotalQuantity] = useState(0)
  const [totalUsers, setTotalUsers] = useState(0)
  const [chartData, setChartData] = useState([])
  const [topProducts, setTopProducts] = useState([])

  useEffect(() => {
    const getOrders = async () => {
      const { data } = await api.vendors.orders.getOrders({
        userAuthToken: token
      }).request
      setTotalSales(calculateTotal(data))
      setTotalQuantity(calculateTotalQuantity(data))
      setTotalUsers(calculateUniqueUsers(data))
    }

    const getAnalitycs = async () => {
      const { data } = await api.vendors.analytics.getAnalytics({
        userAuthToken: token
      }).request
      setChartData(data.data)
      setTopProducts(data.dataTwo)
    }
    getOrders()
    getAnalitycs()
  }, [])

  return (
    <div className='flex flex-col gap-2'>
      <Navbar />
      <div className='flex '>
        <SideBar page={"Home"} />
        <div className='flex flex-col w-full gap-6 px-10'>
          <div className='container flex flex-wrap justify-around mx-auto mt-10 fl'>
            <Statistic>
              <Statistic.Title>Ganancias</Statistic.Title>
              <Statistic.Amount>{totalSales}</Statistic.Amount>
            </Statistic>
            <Statistic>
              <Statistic.Title>Vendidos</Statistic.Title>
              <Statistic.Amount>{totalQuantity}</Statistic.Amount>
            </Statistic>
            <Statistic>
              <Statistic.Title>Usuarios alcanzados</Statistic.Title>
              <Statistic.Amount>{totalUsers}</Statistic.Amount>
            </Statistic>
          </div>
          <div className='flex flex-col gap-8'>
            {chartData &&
              <div className='flex flex-col gap-4'>
                <h4 className="text-body-1 font-semibold text-metal-600">Ultimos 7 dias (ganacias)</h4>
                <AreaChart
                  chartData={chartData}
                  dataKey="total"
                  showTooltip={true}
                  showXaxis={true}
                  showYaxis={true}
                  showGridLine={true}
                  XAxisDataKey='day'
                  chartType='linear'
                />
              </div>
            }
            {chartData &&
              <div className='flex flex-col gap-4'>
                <h4 className="text-body-1 font-semibold text-metal-600">Ultimos 7 dias (articulos vendidos)</h4>
                <AreaChart
                  chartData={chartData}
                  dataKey="quantity"
                  showTooltip={true}
                  showXaxis={true}
                  showYaxis={true}
                  showGridLine={true}
                  XAxisDataKey='day'
                  chartType='linear'
                />
              </div>
            }
          </div>

          <div>
            <Table showCheckbox={true}>
              <Table.Caption>
                <div className="my-5 flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <p className="text-body-1 font-semibold text-metal-600"> Top 5 productos</p>
                  </div>
                </div>
              </Table.Caption>
              <Table.Head>
                <Table.HeadCell>Nombre</Table.HeadCell>
                <Table.HeadCell className="min-w-[152px]">U. vendidas</Table.HeadCell>
                <Table.HeadCell className="min-w-[240px]">Ganacias</Table.HeadCell>
                <Table.HeadCell className="min-w-[240px]">Stock</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-gray-25 divide-y">
                {
                  topProducts?.map((product, index) => (
                    <Table.Row key={index}>

                      <Table.Cell>
                        <div className="flex items-center gap-5">
                          <div className="flex flex-col">
                            <p className="text-body-6 font-medium text-metal-600">
                              {product?.product?.title}
                            </p>
                          </div>
                        </div>
                      </Table.Cell>
                      <Table.Cell className="min-w-[152px]">
                        <div className="flex items-center gap-5">
                          <div className="flex flex-col">
                            <p className="text-body-6 font-medium text-metal-600">
                              {product?.quantity}
                            </p>
                          </div>
                        </div>
                      </Table.Cell>
                      <Table.Cell className="min-w-[240px]">
                        <div className="flex items-center gap-5">
                          <div className="flex flex-col">
                            <p className="text-body-6 font-medium text-metal-600">
                              {product.total}
                            </p>
                          </div>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        {calculateStock(product?.product.stock)}
                      </Table.Cell>
                    </Table.Row>
                  ))

                }
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Dashboard