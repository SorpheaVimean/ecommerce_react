import { request } from "../../../share/request";
import React, { useEffect, useState, useRef } from "react";

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
  Col,
  Row,
  Divider,
  DatePicker,
  Image,
  Tag,
} from "antd";
import {
  configImage,
  formatDateClient,
  formatDateServer,
  isPersmission,
} from "../../../share/help";
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import moment from "moment";
import MainPage from "../../layout/MainPage";
import { Btncompo } from "../../buttons/Buttons";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const Customer = () => {
  const [form] = Form.useForm();
  const [list, setList] = useState([]);
  //   const [role, setRole] = useState([]);

  const [totalRecord, setTotalRecord] = useState(0);

  const [loading, setLoadin] = useState(false);
  const [visible, setVisible] = useState(false);
  const [Id, setId] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePre, setImagePre] = useState(null);
  const refMyImage = useRef();
  const [dob, setDob] = useState();

  const [objFilter, setObjFilter] = useState({
    page: 1,
    txtSearch: "",
    customerStatus: null,
  });
  const { page, txtSearch, customerStatus } = objFilter;

  useEffect(() => {
    getList(objFilter);
  }, [objFilter]);

  const getList = async (parameter = {}) => {
    setLoadin(true);
    var param = "?page=" + (parameter.page || 1);
    param += "&txtSearch=" + (parameter.txtSearch || "");
    param += "&customerStatus=" + parameter.customerStatus;
    const res = await request("customer" + param, "GET");
    setTimeout(() => {
      setLoadin(false);
    }, 300);

    if (res) {
      setList(res.list);
      if (res.totalRecord.length > 0) {
        setTotalRecord(res.totalRecord[0].total);
      }
    }
  };

  const onNewEmplyee = () => {
    setVisible(true);
  };

  const onCloseModal = () => {
    setVisible(false);
    onClearForm();
    setId(null);
  };

  const onDelete = async (rows) => {
    var param = {
      id: rows.id,
      image: rows.image,
    };
    const res = await request("customer", "delete", param);
    if (!res.error) {
      getList();
      message.success(res.message);
    } else {
      message.error(res.message); // Corrected from res.meassage to res.message
    }
  };

  const onFinish = async (values) => {
    const formatdob = formatDateServer(values.dob);
    var formData = new FormData();
    formData.append("firstname", values.firstname);
    formData.append("lastname", values.lastname);
    formData.append("gender", values.gender);
    formData.append("dob", formatdob);
    formData.append("email", values.email);
    formData.append("tel", values.tel);
    formData.append("address", values.address);
    formData.append("password", values.password);
    formData.append("is_active", values.is_active);
    formData.append("image", form.getFieldValue("image"));
    if (image != null) {
      formData.append("img_customer", image, image.filename);
    }
    var method = "post";
    if (Id != null) {
      // mean update
      formData.append("id", Id);
      method = "put";
    }
    console.log(formData);
    setLoadin(true);
    const res = await request("customer", method, formData);
    setLoadin(false);
    console.log(res);

    if (res) {
      message.success(res.message);
      getList();
      form.resetFields();
      onCloseModal();
    }
  };

  const onClearForm = () => {
    form.resetFields();
    setImagePre(null);
    setImage(null);
    refMyImage.current.value = null;
  };

  const onClickEdit = (value) => {
    setId(value.id);
    form.setFieldsValue({
      firstname: value.firstname,
      lastname: value.lastname,
      gender: value.gender + "",
      dob: moment(formatDateClient(value.dob)),
      email: value.email,
      tel: value.tel,
      address: value.address,
      password: value.password,
      role_id: value.role_id + "",
      is_active: value.is_active + "",
      image: value.image,
    });
    setImagePre(configImage.image_path + value.image);
    setVisible(true);
  };

  const onChangFile = (e) => {
    var file = e.target.files[0];
    setImage(file);
    setImagePre(URL.createObjectURL(file));
  };

  const onRmoveImageUpdate = (e) => {
    e.preventDefault();
    setImagePre(null);
    setImage(null);
    form.setFieldsValue({
      image: "",
    });
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
      key: "image",
      title: "image",
      dataIndex: "image",
      render: (value, rows, index) => {
        return (
          <div>
            {value !== null && value !== "" ? (
              <Image
                key={index}
                src={configImage.image_path + value}
                width={60}
                className="rounded-lg align-middle"
                alt=""
              />
            ) : (
              <div className="flex justify-start items-center">
                <FileImageOutlined className="text-4xl" />
              </div>
            )}
          </div>
        );
      },
    },
    {
      key: "firstname",
      title: "firstname",
      dataIndex: "firstname",
      fixed: "left",
      width: 100,
    },
    {
      key: "lastname",
      title: "lastname",
      dataIndex: "lastname",
      fixed: "left",
      width: 100,
    },
    {
      key: "gender",
      title: "gender",
      dataIndex: "gender",
      render: (value, items, index) => (value === 1 ? "Male" : "Female"),
    },
    {
      key: "dob",
      title: "dob",
      dataIndex: "dob",
      render: (value) => formatDateClient(value),
    },
    {
      key: "email",
      title: "email",
      dataIndex: "email",
    },
    {
      key: "tel",
      title: "tel",
      dataIndex: "tel",
    },
    {
      key: "address",
      title: "address",
      dataIndex: "address",
    },
    {
      key: "role_id",
      title: "Role",
      dataIndex: "role_id",
      render: (value) => {
        switch (value) {
          case 4:
            value = "customer";
            break;
          default:
            value = "Unknown";
        }
        return <span>{value}</span>;
      },
    },
    {
      key: "is_active",
      title: "Status",
      dataIndex: "is_active",
      render: (value, items, index) =>
        value === 1 ? (
          <Tag bordered={false} color="success">
            Active
          </Tag>
        ) : (
          <Tag bordered={false} color="error">
            Inactive
          </Tag>
        ),
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

      render: (value, item, index) => {
        return (
          <div key={index}>
            {isPersmission("employee.Update") && (
              <EditOutlined
                className="mr-10 text-blue-600 text-xl hover:bg-gray-300 p-2 rounded-2xl transition duration-500"
                onClick={() => onClickEdit(item)}
              />
            )}
            {isPersmission("employee.Delete") && (
              <Popconfirm
                title="Delete Employee"
                description="Are you sure to delete this employee?"
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
  return (
    <MainPage loading={loading}>
      <div className="mb-2">
        <div className="text-5xl text-center mb-5">Customer</div>
        <div className="flex justify-between ">
          <div className="flex ">
            <Space>
              <div className="text-md w-full lg:text-2xl ">
                Total Customer: {totalRecord}
              </div>

              <Input
                value={txtSearch}
                placeholder="Search by id, firstname, lastname"
                allowClear={true}
                className="w-96 xs:w-56"
                onChange={(event) => {
                  setObjFilter({
                    ...objFilter,
                    txtSearch: event.target.value,
                  });
                }}
              />

              {/* <Select
                value={customerStatus}
                placeholder="Filter by status "
                className="w-40 "
                allowClear
                onChange={(value) => {
                  setObjFilter({
                    ...objFilter,
                    customerStatus: value,
                  });
                }}
              >
                <Option value={"1"}>Actived</Option>
                <Option value={"2"}>Inactive</Option>
              </Select> */}
              {/* <Select
                value={customerStatus}
                placeholder="Status"
                style={{ width: 120 }}
                allowClear
                onChange={(value) => {
                  setObjFilter({
                    ...objFilter,
                    customerStatus: value,
                  });
                }}
              >
                <Option value={"1"}>Actived</Option>
                <Option value={"0"}>Disabled</Option>
              </Select> */}
            </Space>
          </div>
          <div className="">
            {isPersmission("customer.Create") && (
              <Btncompo
              type="primary"
              label="Create Customer"
              icon={<PlusCircleOutlined className="mr-4 text-lg" />}
              onClick={onNewEmplyee}
            />
            )}
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
          // onShowSizeChange  // Called when pageSize is changed
        }}
        dataSource={list}
        columns={columns}
        scroll={{
          x: 1500,
        }}
      />
      <Modal
        open={visible}
        title={Id == null ? "New Customer" : "Update Customer"}
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
                name="firstname"
                label="Firstanme"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastname"
                label="Lastname"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="Please select gender"
                  allowClear={true}
                  onChange={() => {}}
                >
                  <Option value={"1"}>Male</Option>
                  <Option value={"2"}>Female</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dob"
                label="Dob"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <DatePicker
                  className="w-full"
                  Selected={dob}
                  onChange={(date) => setDob(date)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item
                name="tel"
                label="Tel"
                rules={[
                  {
                    required: true,
                    message: "Please input your telephone number!",
                  },
                  {
                    pattern: /^[0-9]+$/,
                    message: "Tel must contain only numbers!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item
                name="is_active"
                label="Status"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="Please select Status"
                  allowClear={true}
                  onChange={() => {}}
                >
                  <Option value={"1"}>Active</Option>
                  <Option value={"2"}>Inactive</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input.Password disabled={Id} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item name="address" label="Address">
                <Input.TextArea />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="role_id"
                label="Role"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  disabled={Id}
                  placeholder=" select role"
                  allowClear={true}
                  onChange={() => {}}
                >
                  <Option value={"4"}>Customer</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item
                label="Select picture"
                // name={"image"}
              >
                {!imagePre && (
                  <button
                    className="bg-gray-100 rounded-full p-10 border border-dashed border-slate-400 hover:border-BgBtn hover:text-BgBtn hover:cu"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent form submission
                      refMyImage.current.click(); // Trigger file input click
                    }}
                  >
                    <button type="button">
                      <PlusOutlined />
                      <div className="mt-2">Upload</div>
                    </button>
                  </button>
                )}
                {/* Show the preview image when there's a value */}
                {imagePre && (
                  <>
                    <div className="bg-gray-100 w-36 h-36 rounded-full overflow-hidden border  border-slate-400 flex justify-center items-center">
                      <img
                        src={imagePre}
                        className=" rounded-full object-cover  w-32 h-32  "
                        alt=""
                        onClick={(e) => {
                          e.preventDefault(); // Prevent form submission
                          refMyImage.current.click(); // Trigger file input click
                        }}
                      />
                    </div>

                    {Id != null && (
                      <div>
                        <button onClick={onRmoveImageUpdate}>
                          <DeleteOutlined className=" text-red-500 text-xl  hover:bg-gray-300 p-2 rounded-2xl transition duration-500" />
                        </button>
                      </div>
                    )}
                  </>
                )}
                {/* Hidden file input element */}
                <input
                  type="file"
                  ref={refMyImage}
                  style={{ display: "none" }}
                  onChange={onChangFile}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item wrapperCol={24} style={{ textAlign: "right" }}>
            <Space>
              <Button htmlType="button" onClick={onClearForm}>
                Clear
              </Button>
              <Button htmlType="summit" type="primary">
                {Id == null ? "SAVE" : "UPDATE"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </MainPage>
  );
};

export default Customer;
