import React, { useState, useEffect } from "react";
import { request } from "../../../share/request";
import { formatDateClient, formatDateServer } from "../../../share/help";
import {
  Input,
  Table,
  Popconfirm,
  Modal,
  DatePicker,
  Button,
  Form,
  message,
  Select,
  Space,
  Upload,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const Employee = () => {
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);

  // Employee state
  const [id, setId] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  //   const [profile, setProfile] = useState("");
  const [role_id, setRole_id] = useState("");
  const [tel, setTel] = useState("");
  const [createAt, setCreateAt] = useState("");
  const [imageUrl, setImageUrl] = useState();
  const [image, setImage] = useState(null)

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setOpen(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        // setOpen(false);
        setImageUrl(url);
      });
     
     
    }
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      {setOpen ? <PlusOutlined /> : <LoadingOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  //columns table
  const colums = [
    {
      // show number
      title: "No",
      rowScope: "row",
      render: (value, items, index) => index + 1,
    },
    {
      title: "Employee Id",
      dataIndex: "id",
    },
    {
      title: "FirstName",
      dataIndex: "firstname",
      key: "key",
    },
    {
      title: "LastName",
      dataIndex: "lastname",
      key: "key",
    },
    {
      title: "gender",
      dataIndex: "gender",
      key: "key",
    },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "key",
      render: (date) => formatDateClient(date),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "key",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "key",
    },
    {
      title: "Telphone",
      dataIndex: "tel",
      key: "key",
    },
    {
      title: "Role",
      dataIndex: "role_id",
      key: "key",
    },
    {
      title: "Created At",
      dataIndex: "createAt",
      key: "key",
      render: (date) => formatDateClient(date),
    },
    {
      title: "Action",
      dataIndex: "action",
      width: 200,
      render: (_, record) =>
        list.length >= 1 ? (
          <div>
            <EditOutlined
              className="mr-10 text-blue-600 text-xl hover:bg-gray-300 p-2 rounded-2xl transition duration-500"
              onClick={() => onColickEdit(record)}
            />
            <Popconfirm
              title="Delete Employee"
              description="Are you sure to delete this employee?"
              onConfirm={() => onDelete(record.id)}
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

            {/* <Button type="dashed">Edit</Button> */}
          </div>
        ) : null,
    },
  ];
  useEffect(() => {
    // block form load
    getList();
  }, []);

  // list employees
  const getList = async () => {
    const res = await request("employee", "get", {});
    if (res) {
      setList(res.list);
    //   console.log(res.list);
    }
  };

  // Create a new employee
  const onCreate = () => {
    onClear();
    setOpen(true);
  };

  // action when click on edit
  const onColickEdit = (record) => {
    // const formatdob = moment(record.dob).format("YYYY-MM-DD");
    setOpen(true);
    setId(record.id);
    form.setFieldValue({
      firstname: record.firstname,
      lastname: record.lastname,
      gender: record.gender,
      dob: formatDateClient(record.dob),
      address: record.address,
      email: record.email,
      tel: record.telphone,
      role_id: record.Role_id,
    });
    // setEmployeeId(record.id);
    // setFistName(record.firstname);
    // setLastName(record.lastname);
    // setGender(record.gender);
    // setDob(record.dob);
    // setAddress(record.address);
    // setTel(record.tel);
    // setEmail(record.email);
    // setRole(record.role_id);
    console.log(record);
  };
  // Delete employee
  const onDelete = async (Id) => {
    const res = await request("employee/" + id, "delete", {});
    if (res) {
      getList();
    } else {
      alert("error");
    }
  };

  // Clear all the fill
  const onClear = () => {
    // setEmployeeId("");
    // setFistName("");
    // setLastName("");
    // setGender(""); // Reset gender state
    // setDob(""); // Reset date state
    // setAddress("");
    // setTel("");
    // setEmail("");
    // setRole("");
    form.resetFields();
  };

  // Cancel button
  const onCancel = () => {
    onClear();
    setOpen(false);
  };

  // Save button
  const onSave = async (values) => {
    console.log("Success:", values);
    console.log("Is on clikc save");
    var formData = new FormData(); 
    formData.append("firstname", values.firstname)
    formData.append("lastname", values.lastname)
    formData.append("gender", values.dob)
    formData.append("dob", values.firstname)
    formData.append("email", values.email)
    formData.append("address", values.address)
    formData.append("tel", values.tel)
    formData.append("role_id", values.role_id)
    formData.append("Image", form.getFieldValue("Image"))
    if (image != null) {
        formData.append("img_employee", image, image.filename)
    } else {
        // remove , nothing
        // formData.append("image_emp",null)
        // if(imagePre == null){
        //     formData.append("isRemove",null)
        // } 
    }
    var method = "post"
    if (id != null) { // mean update
        formData.append("id", id)
        method = "put"
    }
    const res = await request("employee", method, formData);
    if (!res.error) {
        message.success(res.message)
        getList()
        form.resetFields();
        onClear();
    } else {
        message.error(res.message)
    }
    // // Check if all required fields are filled
    // if (!isFormValid()) {
    //   antMessage.error("Please fill in all required fields.");
    //   return;
    // }
    // console.log("Save button clicked");
    // console.log("Values:");
    // setOpen(false);
    // const formattedDob = moment(dob).format("YYYY-MM-DD"); // Format the date
    // var employeeData = {
    //   firstName: firstName,
    //   lastName: lastName,
    //   gender: gender,
    //   dob: formattedDob,
    //   address: address,
    //   tel: tel,
    //   email: email,
    //   role: role,

  };
  // condition input number only
  const handleTelChange = (event) => {
    // Remove any non-numeric characters from the input
    const formattedTel = event.target.value.replace(/\D/g, "");
    setTel(formattedTel);
  };

  return (
    <div>
      <div className="flex justify-between mb-5">
        <div className="flex">
          <h1 className="text-5xl mr-5">Employee</h1>
          <Input
            placeholder="Search here"
            type="Search"
            className="w-72"
            loading
            // onSearch={onSearch}
          />
        </div>
        <Button
          type="primary"
          className="flex justify-center items-center p-5 bg-blue-700 hover:bg-blue-gray-500 "
          onClick={onCreate}
        >
          <PlusCircleOutlined className="mr-5 text-lg" />
          Create
        </Button>
      </div>

      <Table columns={colums}  dataSource={list} pagination={{ pageSize: 10 }} />

      <Modal
        title={id === "" ? "Create New Customer " : "Update employee"}
        open={open}
        // onConfirm={()=>onSave(record.Employee_id)}

        onCancel={onCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={onSave}
          name="controll hooks"
        >
          <Form.Item
            name="firstname"
            label="FirstName"
            allowClear
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastname"
            label="LastName"
            allowClear
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="gender"
              label="Gender"
              allowClear
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                placeholder="Select Gender"
                onChange={(value) => {
                  setGender(value);
                }}
                options={[
                  {
                    value: "1",
                    label: "Male",
                  },
                  {
                    value: "2",
                    label: "Female",
                  },
                ]}
              />
            </Form.Item>

            <Form.Item name="dob" label="Date of Birth">
              <DatePicker
                className="w-full"
                Selected={dob}
                onChange={(date) => setDob(date)}
              />
            </Form.Item>
          </div>
          <Form.Item name={"address"} label="Address">
            <Input.TextArea />
          </Form.Item>

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
          <Form.Item
            name="tel"
            label="Telphone"
            rules={[
              {
                required: true,
              },
            ]}
            onChange={handleTelChange}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role_id"
            label="Role ID"
            allowClear
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Select Gender"
              onChange={(value) => {
                setGender(value);
              }}
              options={[
                {
                  value: "1",
                  label: "Male",
                },
                {
                  value: "2",
                  label: "Female",
                },
              ]}
            />
          </Form.Item>
          <Form.Item name="image" label="image" allowClear>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              
              onChange={handleChange}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="avatar"
                  style={{
                    width: "100%",
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>

          <Form.Item wrapperCol={24} style={{ textAlign: "right" }}>
            <Space>
              <Button htmlType="button" onClick={onCancel}>
                Cancel
              </Button>
              <Button htmlType="button" onClick={onClear}>
                Clear
              </Button>
              <Button htmlType="summit" type="primary">
                {id === "" ? "Save " : "Update "}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Employee;
