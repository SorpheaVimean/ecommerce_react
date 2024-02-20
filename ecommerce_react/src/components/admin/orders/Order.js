import { request } from "../../../share/request";
import React, { useEffect, useRef, useState } from "react";

import {
  Button,
  Table,
  Space,
  Input,
  Modal,
  Form,
  Select,
  message,
  Popconfirm,
  Divider,
  Tag,
  Row,
  Col,
  Image,
} from "antd";
import {
  configImage,
  formatDateClient,
  isPersmission,
} from "../../../share/help";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import MainPage from "../../layout/MainPage";
import { Btncompo } from "../../buttons/Buttons";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const Order = () => {
  const [form] = Form.useForm();
  const [list, setList] = useState([]);
  const [listOrderDetail, setListOrderDetail] = useState([]);
  const [orderName, setOrderName] = useState([]);
  const [paymentName, setPaymetName] = useState([]);
  const [totalRecord, setTotalRecord] = useState(0);
  const [getSum, setGetSum] = useState(0);
  const [getSumQty, setGetSumQty] = useState(0);

  const [loading, setLoadin] = useState(false);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [Id, setId] = useState(null);
  const navigate = useNavigate();
  const onLinkPage = (routeName) => {
    // use for link to other page
    navigate(routeName); // /category , /login
  };
  const [objFilter, setObjFilter] = useState({
    page: 1,
    txtSearch: "",
    order_status_id: null,
    payment_method_id: null,
    is_paid: null,
  });
  const { page, txtSearch, order_status_id, payment_method_id, is_paid } =
    objFilter;

  useEffect(() => {
    getList(objFilter);
    // getlistOrderDetails();
    // onClickView();
  }, [objFilter]);

  const getList = async (parameter = {}) => {
    setLoadin(true);
    const { page, txtSearch, order_status_id } = parameter;
    var param = `?page=${page || 1}&txtSearch=${txtSearch || ""}`;
    if (order_status_id) {
      param += `&order_status_id=${order_status_id}`;
    }
    if (payment_method_id) {
      param += `&payment_method_id=${payment_method_id}`;
    }
    if (is_paid) {
      param += `&is_paid=${is_paid}`;
    }
    const res = await request("order" + param, "GET");
    setTimeout(() => {
      setLoadin(false);
    }, 300);
    setList(res.list);
    if (res.totalRecord.length > 0) {
      setTotalRecord(res.totalRecord[0].total);
    }
    setOrderName(res.orderStatusName);
    setPaymetName(res.paymentName);
  };
  // const getlistOrderDetails = async (value) => {
  //   setLoadin(true);
  //   const res = await request("orderDetail", "GET");
  //   setLoadin(false);
  //   if (res) {
  //     console.log("Clicked to view order details:", res);
  //     setListOrderDetail(res.list);
  //   }
  // };
  // const onNewEmplyee = () => {
  //   setVisible(true);
  // };

  const onCloseModal = () => {
    setVisible(false);
    onClearForm();
    setId(null);
  };

  const onDelete = async (rows) => {
    var param = {
      id: rows.id,
    };
    const res = await request("order", "delete", param);
    if (res) {
      getList();
      message.success(res.message);
    }
  };

  const onFinish = async (values) => {
    const params = {
      order_status_id: values.StatusName,
      is_paid: values.is_paid,
    };
    setLoadin(true);
    var method = "post";
    if (Id != null) {
      params.id = Id;
      method = "put";
    }
    const res = await request("order", method, params);
    setLoadin(false);
    if (res) {
      message.success(res.message);
      getList();
      form.resetFields();
      onCloseModal();
    }
    console.log(params);
  };

  const onClearForm = () => {
    form.resetFields();
  };

  const onClickEdit = (value) => {
    setId(value.id);
    form.setFieldsValue({
      invoice_no: value.invoice_no,
      PayName: value.PayName,
      firstname: value.firstname,
      lastname: value.lastname,
      tel: value.tel,
      order_total: value.order_total,
      StatusName: value.StatusName,
      is_paid: value.is_paid + "",
      customer_address: value.customer_address,
      comment: value.comment,
    });
    setVisible(true);
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
     
      console.log("sum", res.getTotal[0].subtotal);
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
      key: "comment",
      title: "comment",
      dataIndex: "comment",
    },
    {
      key: "create_at",
      title: "Created At",
      dataIndex: "create_at",
      render: (value) => formatDateClient(value),
    },
    {
      key: "Actoin",
      title: "Action",
      width: 150,
      render: (value, item, index) => {
        return (
          <div key={index}>
            {isPersmission("employee.Update") && (
              <EyeOutlined
                className="mr-1 text-blue-600 text-xl hover:bg-gray-300 p-2 rounded-2xl transition duration-500"
                onClick={() => onClickView(item)}
              />
            )}
            {isPersmission("employee.Update") && (
              <EditOutlined
                className="mr-2 text-blue-600 text-xl hover:bg-gray-300 p-2 rounded-2xl transition duration-500"
                onClick={() => onClickEdit(item)}
              />
            )}
            {isPersmission("employee.Delete") && (
              <Popconfirm
                title="Delete order"
                description="Are you sure to delete this order?"
                onConfirm={() => onDelete(item)}
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
  return (
    <MainPage loading={loading}>
      <div className="mb-2">
        <div className="text-5xl text-center mb-5">orders</div>
        <div className="flex justify-between ">
          <div className="flex ">
            <Space>
              <div className="text-md w-full lg:text-2xl ">
                Total orders: {totalRecord}
              </div>

              <Input
                value={txtSearch}
                placeholder="Search by invoice, firstname, lastname"
                allowClear={true}
                className="w-[300px]"
                onChange={(event) => {
                  setObjFilter({
                    ...objFilter,
                    txtSearch: event.target.value,
                  });
                }}
              />
              <Select
                value={order_status_id}
                placeholder="Order Status"
                style={{ width: 150 }}
                allowClear
                onChange={(value) => {
                  setObjFilter({
                    ...objFilter,
                    order_status_id: value,
                  });
                }}
              >
                {orderName?.map((item, index) => (
                  <Option key={index} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
              <Select
                value={payment_method_id}
                placeholder="Payment Method"
                style={{ width: 150 }}
                allowClear
                onChange={(value) => {
                  setObjFilter({
                    ...objFilter,
                    payment_method_id: value,
                  });
                }}
              >
                {paymentName?.map((item, index) => (
                  <Option key={index} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Space>
          </div>
        </div>
      </div>

      <Table
        pagination={{
          defaultCurrent: 1,
          total: totalRecord,
          pageSize: 7,
          onChange: (page, pageSize) => {
            setObjFilter({
              ...objFilter,
              page: page,
            });
          },
        }}
        dataSource={list}
        columns={columns}
        scroll={{
          x: 1500,
        }}
      />
      <Modal
        open={visible}
        title={Id == null ? "New order" : "Update order"}
        onCancel={onCloseModal}
        footer={null}
        maskClosable={false}
        width={800}
      >
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
          <Divider />
          <Row gutter={5}>
            <Col span={12}>
              <Form.Item
                name="invoice_no"
                label=" invoice_no"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input disabled allowClear={false} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="PayName"
                label=" Payment"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input disabled allowClear={false} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={5}>
            <Col span={12}>
              <Form.Item
                name="firstname"
                label=" firstname"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input disabled allowClear={false} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastname"
                label=" lastname"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input disabled allowClear={false} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={5}>
            <Col span={12}>
              <Form.Item
                name="tel"
                label=" tel"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input disabled allowClear={false} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="order_total"
                label="Total Order"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input disabled allowClear={false} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={5}>
            <Col span={12}>
              <Form.Item
                name="StatusName"
                label="StatusName"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="Please select Paid"
                  allowClear={true}
                  onChange={() => {}}
                >
                  {orderName?.map((item, index) => (
                    <Option key={index} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                 
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="is_paid"
                label="is_paid"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="Please select Paid"
                  allowClear={true}
                  onChange={() => {}}
                >
                  <Option value={"1"}>Paid</Option>
                  <Option value={"0"}>Not yet paid</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={5}>
            <Col span={12}>
              <Form.Item
                name="customer_address"
                label="Address"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input.TextArea disabled allowClear={false} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="comment" label="comment">
                <Input.TextArea disabled allowClear={false} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item wrapperCol={24} style={{ textAlign: "right" }}>
            <Space>
              <Button htmlType="button" onClick={onCloseModal}>
                Cancel
              </Button>

              <Button htmlType="summit" type="primary">
                {Id == null ? "SAVE" : "UPDATE"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
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
          <Space>
        

            
            </Space>
            <div className="mr-28 font-bold">
              {/* <div className="">Total orders: {getSum}</div>
              <div className="">Total orders: {getSumQty}</div> */}
              
              
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

export default Order;
