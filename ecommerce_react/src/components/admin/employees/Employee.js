import { request } from "../../../share/request";
import React, { useEffect, useState, useRef } from "react";

import {
  Button,
  Table,
  Space,
  Tag,
  Input,
  Modal,
  Form,
  Select,
  Slider,
  Spin,
  message,
  Popconfirm,
  Col,
  Row,
  Divider,
  InputNumber,
  DatePicker,
} from "antd";
import {
  configImage,
  formatDateClient,
  formatDateServer,
  isPersmission,
} from "../../../share/help";
import { IoIosCloseCircle } from "react-icons/io";
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import moment from "moment";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const EmplyeePage = () => {
  const [form] = Form.useForm();
  const [list, setList] = useState([]);
  const [role, setRole] = useState([]);

  const [total, setTotal] = useState(0);
  const [loading, setLoadin] = useState(false);
  const [visible, setVisible] = useState(false);
  const [Id, setId] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePre, setImagePre] = useState(null);
  const [textSearch, setTextSearch] = useState("");
  const [tel, setTel] = useState();
  const refMyImage = useRef();
  const [dob, setDob] = useState();

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    setLoadin(true);
    var param = "";
    if (textSearch !== +"") {
      param = "?textSearch=" + textSearch;
    }
    const res = await request("employee" + param, "get");
    setLoadin(false);
    if (res) {
      setList(res.list);
      setRole(res.role);

      setTotal(res.total[0].total);
    } else {
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
    const res = await request("employee", "delete", param);
    if (!res.error) {
      getList();
      message.success(res.message);
    } else {
      message.error(res.meassage);
    }
  };

  const onFinish = async (values) => {
    
    // get value from form
    console.log("Success:", values);
    console.log("Is on clikc save");
    const formatdob = formatDateServer(dob);
    var formData = new FormData(); // create formData
    formData.append("firstname", values.firstname);
    formData.append("lastname", values.lastname);
    formData.append("gender", values.gender);
    formData.append("dob", formatdob);
    formData.append("email", values.email);
    formData.append("tel", values.tel);
    formData.append("role_id", values.role_id);
    formData.append("address", values.address);
    formData.append("salary", values.salary);
    formData.append("password", values.password);
    formData.append("image", form.getFieldValue("image"));
    if (image != null) {
      formData.append("img_employee", image, image.filename);
    } else {
      // remove , nothing
      // formData.append("image_emp",null)
      // if(imagePre == null){
      //     formData.append("isRemove",null)
      // }
    }

    var method = "post";
    if (Id != null) {
      // mean update
      formData.append("id", Id);
      method = "put";
    }
    const res = await request("employee", method, formData);
    if (!res.error) {
      message.success(res.message);
      getList();
      form.resetFields();
      onCloseModal();
      console.log(res);
    } else {
      message.error(res.message);
      console.log("THI IS ERROR", res.message);
    }
  };

  const onClearForm = () => {
    form.resetFields();
    setImagePre(null);
    setImage(null);
    refMyImage.current.value = null;
  };

  const onClickEdit = (item) => {
    setId(item.id);
    form.setFieldsValue({
      firstname: item.firstname,
      lastname: item.lastname,
      gender: item.gender + "",
      dob: moment(formatDateServer(item.dob)),
      email: item.email,
      tel: item.tel,
      address: item.address,
      role_id: item.role_id + "",
      image: item.image,
    });
    setImagePre(configImage.image_path + item.image);
    setVisible(true);
  };

  const onSearch = (value) => {
    getList();
  };

  const onChangeTextSearch = (e) => {
    setTextSearch(e.target.value);
  };

  const onChangFile = (e) => {
    var file = e.target.files[0];
    setImage(file);
    setImagePre(URL.createObjectURL(file)); // for pre view image
  };

  const onRmoveImageUpdate = (e) => {
    e.preventDefault();
    setImagePre(null);
    setImage(null);
    form.setFieldsValue({
      image: null,
    });
  };

  // Table columns
  const columns = [
    {
      key: "No",
      title: "No",
      dataIndex: "Id",
      fixed: 'left',
      width: 60,
      render: (value, items, index) => index + 1,
    },
    {
      key: "firstname",
      title: "firstname",
      dataIndex: "firstname",
      fixed: 'left',
      width: 100,
    },
    {
      key: "lastname",
      title: "lastname",
      dataIndex: "lastname",
      fixed: 'left',
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
      key: "image",
      title: "image",
      dataIndex: "image",
      render: (value, rows, index) => {
        return (
          <div>
            {value !== null && value !== "" ? (
              <img
                key={index}
                src={configImage.image_path + value}
                width={50}
                alt=""
              />
            ) : (
              <div
                style={{
                  height: 100,
                  width: 100,
                  backgroundColor: "#eee",
                }}
              />
            )}
          </div>
        );
      },
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
      render: (value, item, index) => {
        
        switch (value) {
          case 1:
            value = "Admin";
            break;
          case 2:
            value = "Manager";
            break;
          case 3:
            value = "Seller";
            break;
          default:
            value = "Unknown";
        }
        return <span>{value}</span>;
      },
      // render: (value) => {
      //   return <Tag color="blue">{value}</Tag>;
      // },
    },
    {
      key: "createAt",
      title: "createAt",
      dataIndex: "createAt",
      render: (value) => formatDateClient(value),
    },
    {
      key: "Actoin",
      title: "Action",

      render: (value, item, index) => {
        return (
          <div key={index}>
            {isPersmission("employee.Update") && (
              // <Button type="primary" onClick={() => onClickEdit(item)}>
              //   Edit
              // </Button>
              <EditOutlined
                className="mr-10 text-blue-600 text-xl hover:bg-gray-300 p-2 rounded-2xl transition duration-500"
                onClick={() => onClickEdit(item)}
              />
            )}
            {/* <Popconfirm
              title="Delete"
              description="Are you sure to delete this record?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => onDelete(item)}
            >
              <Button danger>Delete</Button>
            </Popconfirm> */}
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
          </div>
        );
      },
      // render: (_, record) =>
      //   list.length >= 1 ? (
      //     <div>
      //       <EditOutlined
      //         className="mr-10 text-blue-600 text-xl hover:bg-gray-300 p-2 rounded-2xl transition duration-500"
      //         onClick={() => onColickEdit(record)}
      //       />
      //       <Popconfirm
      //         title="Delete Employee"
      //         description="Are you sure to delete this employee?"
      //         onConfirm={() => onDelete(record.id)}
      //         okText="Yes"
      //         cancelText="No"
      //         okButtonProps={{
      //           style: {
      //             backgroundColor: "blue",
      //             hover: { backgroundColor: "green" },
      //           },
      //         }}
      //       >
      //         <DeleteOutlined className=" text-red-500 text-xl  hover:bg-gray-300 p-2 rounded-2xl transition duration-500" />
      //       </Popconfirm>

      //       {/* <Button type="dashed">Edit</Button> */}
      //     </div>
      //   ) : null,
    },
  ];
  return (
    <div>
      <Spin spinning={loading}>
        <div className="mb-2">
          <div className="text-5xl text-center mb-5">Employee</div>
          <div className="flex justify-between ">
            <div className="flex ">
              <div className="text-3xl w-full mr-10">
                Total Employees: {total}{" "}
              </div>
              <Input.Search
                allowClear
                placeholder="Search by name..."
                onSearch={onSearch}
                onChange={onChangeTextSearch}
              />
            </div>
            <div className="">
              {isPersmission("employee.Create") && (
                // <Button onClick={onNewEmplyee}>New Employee</Button>
                
                  <button
                    
                    className="bg-BgBtn hover:bg-BgBtnHover text-white px-4 py-3 rounded-lg mt-2"
                    onClick={onNewEmplyee}
                  >
                  <PlusCircleOutlined className="mr-5 text-lg" />
                  Create Employee
                </button>
              )}
            </div>
          </div>
        </div>

        <Table dataSource={list} columns={columns}  scroll={{
      x: 1500,
      
    }} />
        <Modal
          open={visible}
          title={Id == null ? "New Employee" : "Update Employee"}
          onCancel={onCloseModal}
          footer={null}
          maskClosable={false}
          width={800}
        >
          <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            // style={{
            //     maxWidth: 600,
            // }}
          >
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
                  name= "dob"
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
            {Id === null && (
              <Row>
                <Col span={12}>
                  <Form.Item
                    name="salary"
                    label="Salary"
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
                    name="password"
                    label="Password"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                </Col>
              </Row>
            )}

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
                  {/* <Input /> */}
                  <Select
                    placeholder=" select role"
                    allowClear={true}
                    onChange={() => {}}
                  >
                    <Option value={"1"}>Admin</Option>
                    <Option value={"2"}>Manager</Option>
                    <Option value={"3"}>Seller</Option>
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
                  <input type="file" ref={refMyImage} onChange={onChangFile} />
                  <div>
                    <img
                      src={imagePre}
                      width={100}
                      style={{ marginTop: 10 }}
                      alt=""
                    />

                    {Id != null && imagePre != null && (
                      <div>
                        <button onClick={onRmoveImageUpdate}>
                          <IoIosCloseCircle size={22} color="red" />
                        </button>
                      </div>
                    )}
                  </div>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item wrapperCol={24} style={{ textAlign: "right" }}>
              <Space>
                <Button htmlType="button" onClick={onCloseModal}>
                  Cancel
                </Button>
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
      </Spin>
    </div>
  );
};

export default EmplyeePage;
