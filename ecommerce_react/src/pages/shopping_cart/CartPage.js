import { useState } from "react";
import { Button, Divider, InputNumber, Popconfirm, Space, Table } from "antd";
import Input from "antd/es/input/Input";
import { FaCcPaypal, FaCcVisa } from "react-icons/fa";
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
const CartPage = () => {
  const datas = [
    {
      img: "https://wallpaperaccess.com/full/2637581.jpg",
      name: "Laptop",
      des: "This is the best laptop",
      Price: 500,
      Quantity: 1,
      key: "1", // Add a unique key for each row
    },
    {
      img: "https://wallpaperaccess.com/full/2637581.jpg",
      name: "Laptop",
      des: "This is the best laptop",
      Price: 500,
      Quantity: 1,
      key: "2", // Add a unique key for each row
    },
    {
      img: "https://wallpaperaccess.com/full/2637581.jpg",
      name: "Laptop",
      des: "This is the best laptop",
      Price: 500,
      Quantity: 1,
      key: "3", // Add a unique key for each row
    },
    {
      img: "https://wallpaperaccess.com/full/2637581.jpg",
      name: "Laptop",
      des: "This is the best laptop",
      Price: 500,
      Quantity: 1,
      key: "4", // Add a unique key for each row
    },
    {
      img: "https://wallpaperaccess.com/full/2637581.jpg",
      name: "Laptop",
      des: "This is the best laptop",
      Price: 500,
      Quantity: 1,
      key: "5", // Add a unique key for each row
    },
  ];
  const [data, setData] = useState(datas);
  const [list, setList] = useState([]);

  const onChange = (value, recordKey) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.key === recordKey ? { ...item, Quantity: value } : item
      )
    );
  };

  const columns = [
    {
      title: "Item",
      key: "Item",
      fixed: true,
      width: 150,
      render: (record) => (
        <div className="flex items-start  flex-col">
          <img src={record.img} alt="item" className="mr-2 w-20" />
          <div>
            <p className="text-lg font-semibold">{record.name}</p>
            <p className="text-sm text-gray-500">{record.des}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "Price",
    },
    {
      title: "Quantity",
      key: "Quantity",
      render: (record) => (
        <Space size="middle">
          <InputNumber
            min={1}
            defaultValue={record.Quantity}
            onChange={(value) => onChange(value || 1, record.key)}
          />
        </Space>
      ),
    },
    {
      title: "Subtotal",
      dataIndex: "Subtotal",
      key: "Subtotal",
      render: (_, record) => (
        <Space size="middle" className="flex justify-between items-center">
          {record.Quantity * record.Price}
         
           
            <Popconfirm
              title="Delete item"
              description="Are you sure to delete this item?"
              // onConfirm={() => onDelete(record.Employee_id)}
              okText="Yes"
              cancelText="No"
              okButtonProps={{
                style: {
                  backgroundColor: "blue",
                  hover: { backgroundColor: "green" },
                },
              }}
            >
              <DeleteOutlined className=" text-red-500 text-xl  hover:bg-gray-300 p-2 rounded-2xl transition duration-500" />
            </Popconfirm>

            
          
        </Space>
      ),
    },
    
  ];

  return (
    <div className="mx-[20px] xs:mx-[30px] xl:mx-[70px] my-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4">
        <div className="col-span-2">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl mb-5 font-bold">Shopping Cart</h1>
            <h1 className="text-3xl mb-5 font-bold">3 Items</h1>
          </div>
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            scroll={{
              x: 500,
              y: 600,
            }}
            bordered
          />
          <div className="flex flex-col md:flex-row justify-between w-full  gap-5 mt-5 items-center md:items-start">
            <button class="cursor-pointer inline-flex items-center rounded-full px-9 py-3 text-xl font-mono font-semibold text-BgBtn hover:text-white border-2 border-BgBtnHover hover:bg-BgBtnHover transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-75 duration-300 focus:bg-transparent">
              CONTINUE SHOPPING
            </button>
            <button class="cursor-pointer inline-flex items-center rounded-full px-9 py-3 text-xl font-mono font-semibold text-BgBtn hover:text-white border-2 border-BgBtnHover hover:bg-BgBtnHover transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-75 duration-300 focus:bg-transparent">
              CLEAR SHOPPING CART
            </button>
          </div>
        </div>

        {/* Payment */}
        <div className="text-xl font-bold space-y-8 bg-Backproducts p-5 mt-7 rounded-xl">
          <p className="text-center text-3xl"> Payment Summary</p>
          <Divider />
          <div className="flex justify-between items-center">
            <p>Items</p>
            <p>3</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Subtotal</p>
            <p>$500</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Discount</p>
            <p>$500</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Tax</p>
            <p>$500</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Order Total</p>
            <p>$ 54533</p>
          </div>
          <div className="flex justify-center  items-center flex-col gap-y-3">
            <button className="login-form-button bg-BgBtn rounded-full p-3 w-full text-white duration-300 hover:scale-105 hover:bg-BgBtnHover">
              Proceed to Checkout
            </button>
            <Divider>OR</Divider>
            <FaCcVisa />
            {/* <button className="login-form-button bg-amber-400 rounded-full p-3 w-full text-black duration-300 hover:scale-105 hover:bg-amber-300">
              <div className="flex justify-center items-center gap-5">
                <p>Checkout with</p>
                <FaCcPaypal />
              </div>
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
