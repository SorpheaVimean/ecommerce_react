import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Divider,
  Form,
  InputNumber,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  message,
} from "antd";
import Input from "antd/es/input/Input";
import { FaCcPaypal, FaCcVisa } from "react-icons/fa";
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { request } from "../../share/request";
import { configImage, getUser } from "../../share/help";
import { BtnSmall, Btncompo } from "../../components/buttons/Buttons";
import { Link } from "react-router-dom";
const CartPage = () => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const user = getUser();
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

  const [modal, contextHolder] = Modal.useModal();
  const [data, setData] = useState(datas);
  const [list, setList] = useState([]);
  const [payment, setPayment] = useState([]);
  const [loading, setLoadin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalRecord, setTotalRecord] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const onChange = (value, recordKey) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.key === recordKey ? { ...item, Quantity: value } : item
      )
    );
  };
  useEffect(() => {
    getList();
    getPayment();
  }, []);

  const getList = async () => {
    setLoadin(true);
    const params = user.id;
    console.log(params);

    const res = await request("cart/" + params, "GET");
    console.log(res);
    setLoadin(false);
    setList(res.list);
    if (res.totalRecord.length > 0) {
      setTotalRecord(res.totalRecord[0].totalItems);
    }
    if (res.totalRecord.length > 0) {
      setTotalPrice(res.totalRecord[0].totalPrice);
    }
  };
  const getPayment = async () => {
    const res = await request("payment", "GET");
    setPayment(res.list);
   
  };
  const onDelete = async (cartID) => {
    const param = {
      id: cartID,
    };
    console.log(cartID);
    const res = await request("cart", "delete", param);
    console.log(res);

    if (res) {
      getList();
      message.success(res.message);
    }
  };
  const handleOk = async () => {
    const parms = {
      customer_id: user.id,
    };
    const res = await request("cart/removeAll", "DELETE", parms);
    console.log("uresfsdfsdf", res);
    if (res) {
      getList();
      message.success(res.message);
    }
  };
  const handleCancel = () => {};

  const confirm = () => {
    modal.confirm({
      title: "Delete All",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure to delete all items from shopping cart?",
      okText: "Yes",
      onOk() {
        handleOk(); // Call the function to delete all items from the cart
      },
      okButtonProps: {
        className: "bg-BgBtn hover:bg-blue-700 text-white", // Tailwind classes for button styling
      },
      cancelText: "No",
      onCancel() {
        handleCancel();
      },
    });
  };
  const onShowModal = () => {
    setIsModalOpen(true);
  };
  const onClearForm = () => {
    form.resetFields();
    
  };
  const onCloseModal = () => {
   setIsModalOpen(false);
    onClearForm();
    // setId(null);
  };
  const onFinish = async (values) => {
   setIsModalOpen(true);
   const params = {
    "customer_id": user.id,
    "customer_address": values.address,
    "payment_method_id": values.paymentMethod
     }
     const res = await request("order", "POST", params);
     if(res){
      message.success(res.message);
      onCloseModal();
     }
  };
  const columns = [
    {
      title: "Item",
      key: "Item",
      fixed: true,
      width: 150,
      render: (record) => (
        <div className="flex items-start  flex-col">
          <img
            src={configImage.image_path + record.image_1}
            alt="item"
            className="mr-2 w-20"
          />
          <div>
            <p className="text-lg font-semibold">{record.name}</p>
            <p className="text-sm text-gray-500">{record.Subtotal}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Quantity",
      key: "Quantity",
      // dataIndex: "qty",
      render: (record) => (
        <Space size="middle">
          <InputNumber
            min={1}
            defaultValue={record.qty}
            onChange={(value) => onChange(value || 1, record.key)}
          />
        </Space>
      ),
    },
    {
      title: "Subtotal",
      key: "Subtotal",
      render: (record) => (
        <Space size="middle" className="flex justify-between items-center">
          <div className="">$ {record.Subtotal}</div>
          <Popconfirm
            title="Delete item"
            description="Are you sure to delete this item?"
            onConfirm={() => onDelete(record.id)} // Make sure record.id is correctly referencing the id field
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
            <h1 className="text-3xl mb-5 font-bold">{totalRecord} Items</h1>
          </div>
          <Table
            columns={columns}
            dataSource={list}
            pagination={false}
            scroll={{
              x: 500,
              y: 600,
            }}
            bordered
          />
          <div className="flex flex-col md:flex-row justify-between w-full  gap-5 mt-5 items-center md:items-start">
            <Link to={"/product"}>
              <button class="cursor-pointer inline-flex items-center rounded-full px-9 py-3 text-xl font-mono font-semibold text-BgBtn hover:text-white border-2 border-BgBtnHover hover:bg-BgBtnHover transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-75 duration-300 focus:bg-transparent">
                CONTINUE SHOPPING
              </button>
            </Link>

            <button
              class="cursor-pointer inline-flex items-center rounded-full px-9 py-3 text-xl font-mono font-semibold text-BgBtn hover:text-white border-2 border-BgBtnHover hover:bg-BgBtnHover transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-75 duration-300 focus:bg-transparent"
              onClick={confirm}
            >
              CLEAR SHOPPING CART
            </button>
            {contextHolder}
          </div>
        </div>

        {/* Payment */}
        <div className="text-xl font-bold space-y-8 bg-Backproducts p-5 mt-7 rounded-xl">
          <p className="text-center text-3xl"> Payment Summary</p>
          <Divider />
          <div className="flex justify-between items-center">
            <p>Items</p>
            <p>{totalRecord}</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Subtotal</p>
            <p>${totalPrice}</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Discount</p>
            <p>$-</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Tax</p>
            <p>$-</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Order Total</p>
            <p>$ {totalPrice}</p>
          </div>
          <div className="flex justify-center  items-center flex-col gap-y-3">
            <button className="login-form-button bg-BgBtn rounded-full p-3 w-full text-white duration-300 hover:scale-105 hover:bg-BgBtnHover" onClick={onShowModal}>
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
      <Modal
        open={isModalOpen}
        title={"Checkout "}
        onCancel={onCloseModal}
        footer={null}
        maskClosable={false}
        width={800}
      >
          <Divider />

        <div className="">
          <div className="flex justify-around mb-5">
            <div className="font-semibold">
              Total Amount: <span className="text-red-500 font-bold"> $  {totalPrice}</span>
            </div>
            <div className="font-semibold">
              Total itmems: <span className="text-red-500 font-bold">   {totalRecord}</span>
            </div>
          </div>
          <div className="flex justify-around mb-5">
            <div className="font-semibold">
             First Name: <span className="font-bold">{user.firstname}</span> 
            </div>
            <div className="font-semibold">
             Last Name: <span className="font-bold">{user.lastname}</span> 
            </div>
          </div>
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
          <Row gutter={5}>
            <Col span={12}>
              <Form.Item
                name="paymentMethod"
                label="Payment Method"
                rules={[
                  {
                    required: true,
                    message: "Please enter payment method"
                  },
                ]}
              >
                <Select
                  placeholder="Please select PaymentMethod"
                  allowClear={true}
                  onChange={() => {}}
                >
                  {payment?.map((item, index) => {
                    return (
                      <Option key={index} value={item.id}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item name="address" label="Address"  rules={[
                  {
                    required: true,
                    message: "Please enter address"
                  },
                ]}>
                <Input.TextArea placeholder="Your address" />
              </Form.Item>
            </Col>
          </Row>
         
          <Row gutter={5}>
            <Col span={12}>
              <Form.Item name="comment" label="Comment"  rules={[
                  {
                    required: true,
                    message: "Please enter comment"
                  },
                ]}>
                <Input.TextArea placeholder="Your comment or Noted for your order" />
              </Form.Item>
              </Col>
              <Col span={12}>
              </Col>
              </Row>

          

          <Form.Item wrapperCol={24} style={{ textAlign: "right" }}>
            <Space>
              <Button htmlType="button" onClick={onCloseModal}>
                Cancel
              </Button>
              <Button htmlType="summit" type="primary">
                Check out 
              </Button>
            </Space>
          </Form.Item>
        </Form>
        </div>
       
      </Modal>
    </div>
  );
};

export default CartPage;
