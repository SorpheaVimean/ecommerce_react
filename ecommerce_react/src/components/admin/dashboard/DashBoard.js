import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import {
  configImage,
  formatDateClientAndHour,
  isPersmission,
} from "../../../share/help";
import {
  Table,
  Modal,
  Tag,
  Image,
} from "antd";
import {
  ShoppingCartOutlined,
  ShoppingOutlined,
  TeamOutlined,
  ShopOutlined
} from "@ant-design/icons";
import {
  EyeOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import { request } from "../../../share/request";
import { useNavigate } from "react-router-dom";
import MainPage from "../../layout/MainPage";
const DashBoard = () => {
 

  const [list, setList] = useState([]);
  const [listOrderDetail, setListOrderDetail] = useState([]);
  const [totalRecord, setTotalRecord] = useState(0);
  const [totalproduct, setTotalProduct] = useState(0);
  const [totalCustomer, setTotalCustomer] = useState(0);
  const [totalPStock, setTotalPStock] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [getSum, setGetSum] = useState(0);
  const [getSumQty, setGetSumQty] = useState(0);

  const [loading, setLoadin] = useState(false);
  const [open, setOpen] = useState(false);
  const [Id, setId] = useState(null);


  useEffect(() => {
    getListOrder();
    getListProduct();
    getListCustomer();
  }, []);

  const getListOrder = async () => {
    setLoadin(true);
    const res = await request("order", "GET");
    setLoadin(false);
    setList(res.latetestOrder);
    if (res.totalRecord.length > 0) {
      setTotalRecord(res.totalRecord[0].total);
    }
    if (res && res.lastFourMonth) {
      const chartData = [["Month", "Total Orders"]];
      res.lastFourMonth.forEach((monthData) => {
        chartData.push([`${monthData.year}-${monthData.month}`, monthData.total_orders]);
      });
      setChartData(chartData);
    }
    console.log("order is", res.lastFourMonth);
  };
  

 
  const getListProduct = async () => {
    setLoadin(true);
    const res = await request("product", "get");
      setLoadin(false);
    if (res) {
      if (res.totalRecord.length > 0) {
        setTotalProduct(res.totalRecord[0].total);
      }
      if (res.pStock.length > 0) {
        setTotalPStock(res.pStock[0].quantity);
      }
    }
  };
  const getListCustomer = async () => {
    setLoadin(true);
    const res = await request("customer", "GET");
      setLoadin(false);
    if (res) {
      if (res.totalRecord.length > 0) {
        setTotalCustomer(res.totalRecord[0].total);
      }
    }
  };

  const onClickView = async (value) => {
    const getID = value.id;
    setOpen(true);
    setLoadin(true);
    const res = await request("orderDetail/" + getID, "GET");
    setLoadin(false);
    if (res) {
      setListOrderDetail(res.list);
      if (res.getTotal.length > 0) {
        setGetSum(res.getTotal[0].subtotal);
        setGetSumQty(res.getTotal[0].Quantity);
      }
    }
  };

  const onClose = () => {
    setOpen(false);
  };
    // Table columns
    const columns = [
      {
        key: "No",
        title: "ID",
        dataIndex: "id",
        fixed: "left",
        width: 60,
      },
      {
        key: "Invoice",
        title: "Invoice",
        dataIndex: "invoice_no",
        fixed: "left",
        width: 100,
      },
      {
        key: "firstname",
        title: "Firstname",
        dataIndex: "firstname",
      },
      {
        key: "lastname",
        title: "Lastname",
        dataIndex: "lastname",
      },
      {
        key: "tel",
        title: "Telphone",
        dataIndex: "tel",
      },
      {
        key: "customer_address",
        title: "Address",
        dataIndex: "customer_address",
      },
      {
        key: "StatusName",
        title: "Status",
        dataIndex: "StatusName",
      },
      {
        key: "PayName",
        title: "Pay By",
        dataIndex: "PayName",
      },
      {
        key: "is_paid",
        title: "is_paid",
        dataIndex: "is_paid",
       
        render: (value, items, index) =>
          value == 1 ? (
            <Tag bordered={false} color="success">
              Paid
            </Tag>
          ) : (
            <Tag bordered={false} color="error">
              Not yet Paid
            </Tag>
          ),
      },
      {
        key: "order_total",
        title: "order_total",
        dataIndex: "order_total",
        render: (value) => {
          const formattedPrice = `$${value.toLocaleString()}`; // Add commas every three digits
          return formattedPrice;
        },
      },
     
      {
        key: "create_at",
        title: "Created At",
        dataIndex: "create_at",
        render: (value) => formatDateClientAndHour(value),
      },
      {
        key: "Actoin",
        title: "View",
        width: 70,
        render: (value, item, index) => {
          return (
            <div key={index}>
              {isPersmission("employee.Update") && (
                <EyeOutlined
                  className="mr-1 text-blue-600 text-xl hover:bg-gray-300 p-2 rounded-2xl transition duration-500"
                  onClick={() => onClickView(item)}
                />
              )}
              
             
            </div>
          );
        },
      },
    ];
    const columnDetail = [
      {
        key: "order_id",
        title: "order_id",
        dataIndex: "order_id",
        fixed: "left",
        width: 100,
      },
      {
        key: "ImageAndPName",
        title: "Product",
        render: (value, rows, index) => {
          return (
            <div className="flex items-top">
              {value.Image !== null && value.Image !== "" ? (
                <Image
                  key={index}
                  src={configImage.image_path + value.Image}
                  width={60}
                  className="rounded-lg align-middle"
                  alt=""
                />
              ) : (
                <div className="flex justify-start items-center">
                  <FileImageOutlined className="text-4xl" />
                </div>
              )}
              <span className="ml-2">{value.PName}</span>
            </div>
          );
        },
      },
      {
        key: "quantity",
        title: "quantity",
        dataIndex: "quantity",
      },
      {
        key: "price",
        title: "price",
        dataIndex: "price",
      },
      {
        key: "discount",
        title: "discount",
        dataIndex: "discount",
      },
    ];
  
    const options = {
      chart: {
        title: "Company Performance",
        subtitle: "Total Sales for the last 4 months",
      },
      chartArea: { width: "50%" },
      hAxis: {
        title: "Month",
        minValue: 0,
      },
      vAxis: {
        title: "Total Orders",
      },
      legend: "none",
  animation: {
    startup: true,
    easing: "out",
    duration: 2500,
  },
  enableInteractivity: false,
    }
  return (
    <MainPage loading={loading}>
      <div className="flex justify-between ">
        <div className="flex bg-gray-200 justify-start items-center gap-8 p-4 w-[400px] rounded-md">
          <div className="rounded-full bg-blue-300  w-20 justify-center flex items-center p-4">
          <ShoppingCartOutlined className=" text-blue-500  text-5xl"/>
          </div>
          <div className="">
            <p className="text-gray-500 text-xl">Total Orders</p>
            <p className="text-black text-2xl">{totalRecord}</p>
          </div>
        </div>
        <div className="flex bg-gray-200 justify-start items-center gap-8 p-4 w-[400px] rounded-md">
          <div className="rounded-full bg-green-300  w-20 justify-center flex items-center p-4">
          <ShoppingOutlined className=" text-BgBtn text-5xl"/>
          </div>
          <div className="">
            <p className="text-gray-500 text-xl">Total Products</p>
            <p className="text-black text-2xl">{totalproduct}</p>
          </div>
        </div>
        <div className="flex bg-gray-200 justify-start items-center gap-8 p-4 w-[400px] rounded-md">
          <div className="rounded-full bg-orange-200 w-20 justify-center flex items-center p-4">
          <TeamOutlined className=" text-orange-400 text-5xl"/>
          </div>
          <div className="">
            <p className="text-gray-500 text-xl">Total Customers</p>
            <p className="text-black text-2xl">{totalCustomer}</p>
          </div>
        </div>
        <div className="flex bg-gray-200 justify-start items-center gap-8 p-4 w-[400px] rounded-md">
          <div className="rounded-full bg-purple-300 w-20 justify-center flex items-center p-4">
          <ShopOutlined className=" text-purple-400 text-5xl"/>
          
          </div>
          <div className="">
            <p className="text-gray-500 text-xl">Total Products in Stock</p>
            <p className="text-black text-2xl">{totalPStock}</p>
          </div>
        </div>
      
      </div>
      <div className="flex justify-between items-center mt-5">
      <Chart
      // className="transition-opacity duration-1000 hover:opacity-100"
        width={"85%"}
        height={"400px"}
        chartType="Bar"
        loader={<div>Loading Chart</div>}
        data={chartData}
        options={options}
        // rootProps={{ "data-testid": "1" }}
      />
    <div className="">Hello</div>
      </div>
      
    <div className="text-xl mb-2">Latest Orders</div>
     <Table
        pagination={false}
        dataSource={list}
        columns={columns}
        scroll={{
          x: 1500,
        }}
      />
      {/* order Detail */}
      <Modal
        open={open}
        title={Id == null ? "New order" : "Update order"}
        onCancel={onClose}
        footer={null}
        maskClosable={false}
        width={800}
      >
        <Table
          dataSource={listOrderDetail}
          columns={columnDetail}
          pagination={false} 
        />
        
        <div className=" flex items-center justify-around mt-5">
          <div className=" text-xl font-semibold">
            Order Summary
          </div>
          <div className="flex justify-between items-center">
            <div className="mr-28 font-bold">
              <p>Total Quantity:</p>
              <p>Discount:</p>
              <p>Discount price:</p>
              <p>Total Price:</p>
            </div>
            <div className="flex flex-col gap-5">
            <div>
              <p> {getSumQty}</p>
              <p> -</p>
              <p> -</p>
              <p>$ {getSum}</p>
              {/* <p> {order.total}</p> */}
            </div>
          
            </div>
          </div>
        </div>
      </Modal>
    </MainPage>
   
  );
};

export default DashBoard;
